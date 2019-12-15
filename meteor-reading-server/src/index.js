const ChapterSpider = require('./chapter-spider');
const NovelSpider = require('./novel-spider');
const redis = require('./redis');

const quitRedis = (isNovelSpiderEnd, isChapterSpiderEnd) => {

    /**
     * 释放资源链接
     */
    if (isNovelSpiderEnd && isChapterSpiderEnd) {
        redis.quit();
    }
};

(async () => {
    let isNovelSpiderEnd = false;
    let isChapterSpiderEnd = false;

    const novelSpider = new NovelSpider();
    const novelTime = setInterval(async () => {
        const len = await novelSpider.writeData(novelSpider.dbInsertMaxLimit);
        if (len <= novelSpider.dbInsertMaxLimit && isNovelSpiderEnd) {
            await novelSpider.writeData(-1); // 全部写入数据
            quitRedis(isNovelSpiderEnd, isChapterSpiderEnd);
            clearInterval(novelTime);
        }
    }, 80);
    await novelSpider.start().then(() => {
        isNovelSpiderEnd = true;
    });

    const chapteSpider = new ChapterSpider();
    const chapterTime = setInterval(async () => {
        const len = await chapteSpider.writeData(chapteSpider.dbInsertMaxLimit);
        if (len <= chapteSpider.dbInsertMaxLimit && isChapterSpiderEnd) {
            await chapteSpider.writeData(-1); // 全部写入数据
            quitRedis(isNovelSpiderEnd, isChapterSpiderEnd);
            clearInterval(chapterTime);
        }
    }, 80);
    await chapteSpider.start().then(() => {
        isChapterSpiderEnd = true;
    });
})();
