'use strict';
const logger = require('../logger');
const novelListRule = require('./novel-list-rule');
const novelDetailRule = require('./novel-detail-rule');
const ChapterSpider = require('../chapter-spider');

const Crawler = require('../crawler');
let LRU = require('lru-cache'),
    options = {
        max: 5000,
    },
    cache = new LRU(options);

exports.cache = cache;

const isDev = process.env.NODE_ENV !== 'production';

/**
 * 小说爬虫核心
 */
class NovelSpider {
    constructor(aimUrlArr, itemCount) {
        this.isInserting = false;
        this._novelListRule = novelListRule;
        this._novelDetailRule = novelDetailRule;
        this.count = 1;
        this.page = isDev ? 1 : 40;
        this.dbInsertMaxLimit = isDev ? 10 : 200;
        this.aimUrlArr = aimUrlArr;
        this.itemCount = itemCount;
    }

    async start() {
        try {
            return await this.crawlNovelList();
        } catch (error) {
            console.log(error);
        }
    }

    async crawlNovelList() {
        const _novelListCrawler = this.getNovelCrawler();
        for (let url of this.aimUrlArr) {
            _novelListCrawler.queue(url);
        }
        return await _novelListCrawler.start();
    }

    getNovelCrawler() {
        return new Crawler({
            maxConnections: 5,
            callback: async (error, $) => {
                if (error) {
                    logger.novel_error.error(error);
                    return Promise.reject(error);
                }
                let items = this._novelListRule.parse($);
                return await this.crawlNovelDetail(items);
            },
        });
    }

    async crawlNovelDetail(items) {
        const _novelDetailCrawler = this.getNovelDetailCrawler();
        let count = 0;
        const arr = [];
        for (const item of items) {
            if (this.itemCount && count >= this.itemCount) {
                break;
            }
            count++;
            logger.novel.info(`正在抓取小说：${item.name}\n小说链接：${item.url}`);
            _novelDetailCrawler.queue(item.url, item);
        }
        return arr.concat(await _novelDetailCrawler.start());
    }

    getNovelDetailCrawler() {
        return new Crawler({
            maxConnections: 20,
            rateLimit: 50 * Math.random(),
            callback: async (error, $, item) => {
                if (error) {
                    logger.novel_error.error(item.url, error.message);
                    return Promise.reject(error);
                }
                try {
                    const data = await this.parseDetailData($, item);
                    if (data) {
                        cache.set(data.id, data);
                    }
                    return data;
                } catch (error) {
                    return null;
                }
            },
        });
    }

    async parseDetailData($, item) {
        const detailData = this._novelDetailRule.parse($);

        if (!detailData) {
            return;
        }

        const [chapters] = await new ChapterSpider(item.chapterListUrl).start();

        return {
            ...item,
            ...detailData,
            chapters,
        };
    }
}

exports.NovelSpider = NovelSpider;
