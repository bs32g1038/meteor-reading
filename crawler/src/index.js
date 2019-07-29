const ChapterSpider = require('./chapter-spider');
const NovelSpider = require('./novel-spider');
const redis = require('./redis');

(async () => {
    await new NovelSpider().start();
    await new ChapterSpider().start();

    /**
     * 释放资源链接
     */
    redis.quit();
})();