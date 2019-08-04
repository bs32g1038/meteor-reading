'use strict';
const utils = require('utility');
const constant = require('../constant');
const redis = require('../redis');
const models = require('../models');
const logger = require('../logger');
const { request, trimAllSpace } = require('../utils');
const chapterListRule = require('./chapter-list-rule');
const chapterDetailRule = require('./chapter-detail-rule');
const Crawler = require('../crawler');

const isDev = process.env.NODE_ENV !== 'production';

class ChapterSpider {
    constructor() {
        this.isInserting = false;
        this.dbInsertMaxLimit = isDev ? 10 : 200;
        this.request = request;
        this._chapterLinkListRule = chapterListRule;
        this._chapterDetailRule = chapterDetailRule;
        this.CHAPTER_LIST_FETCH_TASK_LIMIT = 1;
        this.CHAPTER_CONTENT_FETCH_TASK_LIMIT = 20;
    }

    async start() {
        logger.chapter.info('启动小说章节抓取爬虫...');
        await this.crawlChapters();
        logger.chapter.info('爬取数据结束！');
    }

    async crawlChapters() {
        const urls = await redis.smembersAsync(constant.CHAPTER_PAGE_URL_LIST);
        const _crawler = this.getChapterCrawler();
        for (let url of urls) {
            _crawler.queue(url, url);
        }
        await _crawler.start();
    }

    getChapterCrawler() {
        return new Crawler({
            maxConnections: this.CHAPTER_LIST_FETCH_TASK_LIMIT,
            rateLimit: 50 * Math.random(),
            callback: async (error, $, url) => {
                if (error) {
                    return logger.chapter_error.error(url, error.message);
                }
                const arr = this._chapterLinkListRule.parse($);
                const novelId = await redis.hgetAsync(constant.CHAPTER_PAGE_URL_MD5_MAP_NOVEL_ID, utils.md5(url));

                logger.chapter.info(`正在抓取小说${novelId}的章节数据\n小说章节列表url：${url}`);

                const _chapterContentCrawler = this.getChapterContentCrawler();

                for (let data of arr) {
                    if (!data) {
                        continue;
                    }

                    const fingerprint = utils.md5(data.novelId + trimAllSpace(data.title));

                    // 判断是否存在，该用于多网站爬取的时候的去重。
                    if (await redis.sismemberAsync(constant.CHAPTER_FINGERPRINT, fingerprint)) {
                        await redis.saddAsync(constant.CHAPTER_URL_MD5_SET, utils.md5(data.chapterUrl));
                        continue;
                    }

                    if (await redis.sismemberAsync(constant.CHAPTER_URL_MD5_SET, utils.md5(data.chapterUrl))) {
                        continue;
                    }

                    _chapterContentCrawler.queue(data.chapterUrl, { ...data, fingerprint, novelId, url });
                }

                return await _chapterContentCrawler.start();
            },
        });
    }

    getChapterContentCrawler() {
        return new Crawler({
            maxConnections: this.CHAPTER_CONTENT_FETCH_TASK_LIMIT,
            rateLimit: 50 * Math.random(),
            callback: async (error, $, data) => {
                if (error) {
                    return logger.chapter_error.error(data.chapterUrl, error.message);
                }
                const res = this._chapterDetailRule.parse($);
                await redis.lpushAsync(
                    constant.CACHE_CHAPTER_LIST,
                    JSON.stringify({
                        ...data,
                        sum_words: res.content.replace(/^\s+|<br>|\s+$/g, '').length,
                        novel_id: data.novelId,
                        content: res.content,
                        url: data.url,
                    })
                );
            },
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
                return new Promise(resolve => {
                    redis
                        .multi()
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
            await (maxLimit == -1
                ? redis.delAsync(constant.CACHE_CHAPTER_LIST)
                : redis.ltrimAsync(constant.CACHE_CHAPTER_LIST, maxLimit, -1));
            this.isInserting = false;
        }
        return len;
    }

    async writeDB(arr, novelIdArr) {
        try {
            return await models.db.transaction(function(t) {
                const updateAction = () => {
                    const pArr = [];
                    for (let novelId of novelIdArr) {
                        const _temp = models.chapter
                            .findOne({
                                where: { novel_id: novelId },
                                attributes: ['id'],
                                order: [['index', 'DESC']],
                            })
                            .then(async chapter => {
                                if (!chapter && !chapter.id) {
                                    return;
                                }
                                const sum_words = await models.chapter.sum('sum_words', {
                                    where: { novel_id: novelId },
                                });
                                return models.novel.update(
                                    { last_chapter_id: chapter.id, sum_words },
                                    { where: { id: novelId } },
                                    { transaction: t }
                                );
                            });
                        pArr.push(_temp);
                    }
                    return Promise.all(pArr);
                };
                return models.chapter
                    .bulkCreate(arr, { ignoreDuplicates: true }, { transaction: t })
                    .then(updateAction);
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
