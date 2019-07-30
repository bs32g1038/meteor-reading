'use strict';
const utils = require('utility');
const constant = require('../constant');
const redis = require('../redis');
const models = require('../models');
const logger = require('../logger');
const { createTask, request, trimAllSpace } = require('../utils');
const chapterListRule = require('./chapter-list-rule');
const chapterDetailRule = require('./chapter-detail-rule');
const delay = require('delay');

const isDev = process.env.NODE_ENV !== 'production';

class ChapterSpider {
    constructor() {
        this.isInserting = false;
        this.dbInsertMaxLimit = isDev ? 10 : 180;
        this.request = request;
        this._chapterLinkListRule = chapterListRule;
        this._chapterDetailRule = chapterDetailRule;
        this.CHAPTER_LIST_FETCH_TASK_LIMIT = 1;
        this.CHAPTER_CONTENT_FETCH_TASK_LIMIT = 30;
    }
    async start() {
        logger.chapter.info(`启动小说章节抓取爬虫...`);
        logger.chapter.info(`正在写入遗留数据...`);
        await this.writeData(-1);
        logger.chapter.info('处理遗留数据完毕！');
        await this.crawlChapters();
        await this.writeData(-1);
        logger.chapter.info('爬取数据结束！');
    }
    async crawlChapters() {
        const urls = await redis.smembersAsync(constant.CHAPTER_PAGE_URL_LIST);
        const fn = async url => {
            await delay(50 * Math.random());
            return this.request(url)
                .then(async htmlStr => {
                    const novelId = await redis.hgetAsync(constant.CHAPTER_PAGE_URL_MD5_MAP_NOVEL_ID, utils.md5(url));
                    const len = await redis.hgetAsync(constant.NOVEL_CHAPTER_COUNT_SET, utils.md5(url));
                    const arr = this._chapterLinkListRule.parse(htmlStr);
                    if (arr.length <= len) {
                        logger.chapter.info(`已经缓存小说${novelId}的所有章节！`);
                        return;
                    } else {
                        logger.chapter.info(`正在抓取小说的章节数据\n小说章节列表url：${url}`);
                    }
                    const fn = data => {
                        return this.crawlChapterContent({ ...data, novelId, url });
                    };
                    return await createTask(arr, this.CHAPTER_CONTENT_FETCH_TASK_LIMIT, fn);
                })
                .catch(err => {
                    logger.chapter_error.error(url, err.message);
                });
        };
        await createTask(urls, this.CHAPTER_LIST_FETCH_TASK_LIMIT, fn);
    }
    async crawlChapterContent(data) {
        const fingerprint = utils.md5(data.novelId + trimAllSpace(data.title));

        // 判断是否存在，该用于多网站爬取的时候的去重。
        if (await redis.sismemberAsync(constant.CHAPTER_FINGERPRINT, fingerprint)) {
            await redis.saddAsync(constant.CHAPTER_URL_MD5_SET, utils.md5(data.chapterUrl));
            return;
        }

        if (await redis.sismemberAsync(constant.CHAPTER_URL_MD5_SET, utils.md5(data.chapterUrl))) {
            return;
        }
        return this.request(data.chapterUrl).then(async htmlStr => {
            const res = this._chapterDetailRule.parse(htmlStr);
            redis.lpush(
                constant.CACHE_CHAPTER_LIST,
                JSON.stringify({
                    ...data,
                    sum_words: res.content.replace(/^\s+|<br>|\s+$/g, '').length,
                    novel_id: data.novelId,
                    content: res.content,
                    url: data.url,
                    fingerprint,
                })
            );
            await this.writeData(this.dbInsertMaxLimit);
        });
    }
    async getCacheChapterData(limit) {
        let set = new Set();
        let arr = await redis.lrangeAsync(constant.CACHE_CHAPTER_LIST, 0, limit);
        if (!arr || arr.length <= 0) {
            return null;
        }
        for (let i = 0; i < arr.length; i++) {
            arr[i] = JSON.parse(arr[i]);
            if (arr[i].novelId) {
                set.add(arr[i].novelId);
            }
        }
        return {
            arr,
            novelIdArr: set,
        };
    }
    async writeData(maxLimit) {
        const len = await redis.llenAsync(constant.CACHE_CHAPTER_LIST);
        if (len > maxLimit && !this.isInserting) {
            this.isInserting = true;
            let data;
            if (maxLimit == -1) {
                data = await this.getCacheChapterData(maxLimit);
            } else {
                data = await this.getCacheChapterData(this.dbInsertMaxLimit);
            }
            if (!data || !data.arr) {
                this.isInserting = false;
                return;
            }
            await this.writeDB(data.arr, data.novelIdArr);
            await data.arr.map(async item => {
                new Promise(resolve => {
                    redis
                        .multi()
                        .hincrby(constant.NOVEL_CHAPTER_COUNT_SET, utils.md5(item.url), 1)
                        .sadd(constant.CHAPTER_URL_MD5_SET, utils.md5(item.chapterUrl))
                        .sadd(
                            constant.CHAPTER_FINGERPRINT,
                            JSON.stringify({
                                fingerprint: item.fingerprint,
                                novelId: item.novelId,
                            })
                        )
                        .exec(function(err) {
                            if (err) {
                                logger.system.info('redis错误', err);
                            }
                            resolve();
                        });
                });
            });
            maxLimit == -1
                ? redis.del(constant.CACHE_CHAPTER_LIST)
                : redis.ltrim(constant.CACHE_CHAPTER_LIST, maxLimit, -1);
            this.isInserting = false;
        }
    }
    async writeDB(arr, novelIdArr) {
        try {
            return await models.db.transaction(function(t) {
                return models.chapter
                    .bulkCreate(
                        arr,
                        {
                            ignoreDuplicates: true,
                        },
                        { transaction: t }
                    )
                    .then(function() {
                        const pArr = [];
                        for (let novelId of novelIdArr) {
                            pArr.push(
                                models.chapter
                                    .findOne({
                                        where: {
                                            novel_id: novelId,
                                        },
                                        attributes: ['id'],
                                        order: [['index', 'DESC']],
                                    })
                                    .then(async chapter => {
                                        const sum_words = await models.chapter.sum('sum_words', {
                                            where: {
                                                novel_id: novelId,
                                            },
                                        });
                                        return models.novel.update(
                                            {
                                                last_chapter_id: chapter.id,
                                                sum_words,
                                            },
                                            {
                                                where: {
                                                    id: novelId,
                                                },
                                            },
                                            { transaction: t }
                                        );
                                    })
                            );
                        }
                        return Promise.all(pArr);
                    });
            });
        } catch (error) {
            if (error.code != 11000) {
                logger.chapter_error.error('写入数据库失败！', error);
                process.exit(0);
            }
        }
    }
}

module.exports = ChapterSpider;
