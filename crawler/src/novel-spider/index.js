'use strict';
const utils = require('utility');
const { trimAllSpace } = require('../utils');
const constant = require('../constant');
const redis = require('../redis');
const models = require('../models');
const fs = require('fs');
const path = require('path');
const logger = require('../logger');
const novelListRule = require('./novel-list-rule');
const novelDetailRule = require('./novel-detail-rule');
const Crawler = require('../crawler');

const isDev = process.env.NODE_ENV !== 'production';

/**
 * 小说爬虫核心
 */
class NovelSpider {
    constructor() {
        this.isInserting = false;
        this._novelListRule = novelListRule;
        this._novelDetailRule = novelDetailRule;
        this.count = 1;
        this.page = isDev ? 1 : 40;
        this.dbInsertMaxLimit = isDev ? 10 : 200;
    }

    async start() {
        try {
            logger.novel.info('启动小说抓取爬虫...');
            await this.crawlNovelList();
            logger.novel.info('爬取数据结束！');
        } catch (error) {
            console.log(error);
        }
    }

    async crawlNovelList() {
        const _novelListCrawler = this.getNovelCrawler();
        for (let i = 1; i <= this.page; i++) {
            _novelListCrawler.queue(this._novelListRule.getAimUrl(i));
        }
        return await _novelListCrawler.start();
    }

    getNovelCrawler() {
        return new Crawler({
            maxConnections: 1,
            rateLimit: 50 * Math.random(),
            callback: async (error, $) => {
                if (error) {
                    return logger.novel_error.error(error.message);
                }
                let items = this._novelListRule.parse($);
                return await this.crawlNovelDetail(items);
            },
        });
    }

    async crawlNovelDetail(items) {
        const _novelDetailCrawler = this.getNovelDetailCrawler();
        for (const item of items) {
            if (await redis.sismemberAsync(constant.NOVEL_URL_MD5_SET, utils.md5(item.url))) {
                logger.novel.info(`已经缓存小说：${item.name}\n小说链接：${item.url}`);
                return;
            }
            logger.novel.info(`正在抓取小说：${item.name}\n小说链接：${item.url}`);
            _novelDetailCrawler.queue(item.url, item);
        }
        return await _novelDetailCrawler.start();
    }

    getNovelDetailCrawler() {
        return new Crawler({
            rateLimit: 50 * Math.random(),
            maxConnections: 10,
            callback: async (error, $, item) => {
                if (error) {
                    return logger.novel_error.error(item.url, error.message);
                }
                return await this.parseDetailData($, item);
            },
        });
    }

    async parseDetailData($, item) {
        const detailData = this._novelDetailRule.parse($);

        if (!detailData) {
            return;
        }

        let id = await redis.hgetAsync(constant.CHAPTER_PAGE_URL_MD5_MAP_NOVEL_ID, utils.md5(item.chapterListUrl));
        if (id) {
            id = parseInt(id);
        } else {
            id = await redis.hincrbyAsync('globl_id', 'novel_id', 2);
        }

        const fingerprint = utils.md5(trimAllSpace(item.name) + trimAllSpace(detailData.author));

        // 判断是否存在，该用于多网站爬取的时候的去重。
        if (await redis.sismemberAsync(constant.NOVEL_FINGERPRINT, fingerprint)) {
            return this.cacheToRedis({
                ...item,
                id,
                fingerprint,
            });
        }

        await this.downNovelImage(detailData.picUrl, fingerprint);

        let tmp = {
            ...item,
            ...detailData,
            tag_id: detailData.tagId,
            sum_words: detailData.sumWords,
            id,
            fingerprint,
            pic: fingerprint + '.jpg',
        };
        return await redis.lpushAsync(constant.CACHE_NOVEL_LIST, JSON.stringify(tmp));
    }

    async downNovelImage(picUrl, fingerprint) {
        const _downNovelImageCrawler = new Crawler({
            maxConnections: 1,
            cheerio: false,
            request: { method: 'GET', responseType: 'stream' },
            callback: async (error, res, id) => {
                if (error) {
                    return logger.novel_error.error(error.message);
                }
                return res.pipe(fs.createWriteStream(path.resolve(__dirname, '../../images/' + id + '.jpg')));
            },
        });
        _downNovelImageCrawler.queue(picUrl, fingerprint);
        return await _downNovelImageCrawler.start();
    }

    async getCacheNovelData(limit) {
        const arr = await redis.lrangeAsync(constant.CACHE_NOVEL_LIST, 0, limit);
        return !arr || arr.length <= 0
            ? null
            : arr.map(item => {
                return JSON.parse(item);
            });
    }

    async writeData(maxLimit) {
        const len = await redis.llenAsync(constant.CACHE_NOVEL_LIST);
        if (len >= maxLimit && !this.isInserting) {
            this.isInserting = true;
            const arr =
                maxLimit == -1
                    ? await this.getCacheNovelData(maxLimit)
                    : await this.getCacheNovelData(this.dbInsertMaxLimit);
            if (!arr) {
                this.isInserting = false;
                return;
            }
            await this.writeDB(arr);
            await Promise.all(
                arr.map(item => {
                    return this.cacheToRedis(item);
                })
            );
            maxLimit == -1
                ? redis.del(constant.CACHE_NOVEL_LIST)
                : redis.ltrim(constant.CACHE_NOVEL_LIST, maxLimit, -1);
            this.isInserting = false;
        }
        return len;
    }

    async writeDB(arr) {
        try {
            return await models.novel.bulkCreate(arr, {
                ignoreDuplicates: true,
            });
        } catch (error) {
            if (error.code != 11000) {
                logger.novel_error.error('写入数据库失败！', error);
                process.exit(0);
            }
        }
    }

    cacheToRedis(item) {

        /**
         * 记录目标网站小说路径URL的md5， 用于标识是否入库
         * 记录小说章节列表的MD5与小说id的映射，用于快速查找章节所属的小说
         * 记录小说详细信息的url，用于快速更新数据，避免再次抓取网页获取url
         * 记录小说章节列表，用于快速获取章节数据
         */
        return new Promise(resolve => {
            redis
                .multi()
                .hset(constant.CHAPTER_PAGE_URL_MD5_MAP_NOVEL_ID, utils.md5(item.chapterListUrl), item.id)
                .sadd(constant.NOVEL_URL_MD5_SET, utils.md5(item.url))
                .sadd(constant.NOVEL_URL_LIST, item.url)
                .sadd(constant.CHAPTER_PAGE_URL_LIST, item.chapterListUrl)
                .sadd(
                    constant.NOVEL_FINGERPRINT,
                    JSON.stringify({
                        fingerprint: item.fingerprint,
                        id: item.id,
                    })
                )
                .exec(async function(err) {
                    if (err) {
                        return logger.system.info('redis错误', err);
                    }
                    resolve();
                });
        });
    }
}

module.exports = NovelSpider;
