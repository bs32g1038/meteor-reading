'use strict';
const utils = require('utility');
const logger = require('../logger');
const { request } = require('../utils');
const chapterListRule = require('./chapter-list-rule');
const chapterDetailRule = require('./chapter-detail-rule');
const Crawler = require('../crawler');

let LRU = require('lru-cache'),
    options = {
        max: 10000,
    },
    cache = new LRU(options);

const isDev = process.env.NODE_ENV !== 'production';

class ChapterSpider {
    constructor(aimUrl) {
        this.isInserting = false;
        this.dbInsertMaxLimit = isDev ? 10 : 200;
        this.request = request;
        this._chapterLinkListRule = chapterListRule;
        this._chapterDetailRule = chapterDetailRule;
        this.CHAPTER_LIST_FETCH_TASK_LIMIT = 1;
        this.CHAPTER_CONTENT_FETCH_TASK_LIMIT = 20;
        this.aimUrl = aimUrl;
    }

    async start() {
        return await this.crawlChapters();
    }

    async crawlChapters() {
        const _crawler = this.getChapterCrawler();
        _crawler.queue(this.aimUrl, this.aimUrl);
        return await _crawler.start();
    }

    getChapterCrawler() {
        return new Crawler({
            maxConnections: this.CHAPTER_LIST_FETCH_TASK_LIMIT,
            callback: async (error, $, url) => {
                if (error) {
                    logger.chapter_error.error(url, error.message);
                    return Promise.reject(error);
                }
                return this._chapterLinkListRule.parse($);
            },
        });
    }

    async crawlChapterContent(chapterUrl) {
        const _crawler = this.getChapterContentCrawler();
        if (cache.get(utils.md5(chapterUrl))) {
            return [cache.get(utils.md5(chapterUrl))];
        }
        _crawler.queue(chapterUrl, chapterUrl);
        return await _crawler.start();
    }

    getChapterContentCrawler() {
        return new Crawler({
            maxConnections: 1,
            callback: async (error, $, url) => {
                if (error) {
                    return logger.chapter_error.error(url, error.message);
                }
                const res = this._chapterDetailRule.parse($);
                cache.set(utils.md5(url), res);
                return res;
            },
        });
    }
}

module.exports = ChapterSpider;
