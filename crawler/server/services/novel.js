const spider = require('../../src/novel-spider');
const NovelCrawler = spider.NovelSpider;
const ChapterCrawler = require('../../src/chapter-spider');
const _ = require('lodash');
const utils = require('utility');

exports.crontabCrawler = async () => {
    let isCrawing = false;
    const crawler = async () => {
        if (isCrawing) {
            return;
        }
        isCrawing = true;
        const urlArr = [];
        for (let i = 0; i < 20; i++) {
            urlArr.push(`https://www.ddxsku.com/list/1_${i}.html`);
            urlArr.push(`https://www.ddxsku.com/list/2_${i}.html`);
            urlArr.push(`https://www.ddxsku.com/list/3_${i}.html`);
            urlArr.push(`https://www.ddxsku.com/list/4_${i}.html`);
        }
        await new NovelCrawler(urlArr).start();
        // eslint-disable-next-line require-atomic-updates
        isCrawing = false;
    };
    crawler();
    setInterval(crawler, 1000 * 60 * 60);
};

exports.getNovelList = async () => {
    const _db = spider.cache.values();

    const [xuanhuan, xianxia, junshi, dushi] = [1, 2, 3, 4].map(tagId => {
        return _db
            .filter(item => {
                return item.tagId === tagId;
            })
            .slice(0, 10)
            .map(item => {
                return _.omit(item, 'chapters');
            });
    });

    const data = _db.sort((a, b) => {
        return a.name < b.name;
    });

    const guessRecommends = _.slice(data, 0, 5).map(item => {
        return _.omit(item, 'chapters');
    });

    const hotRecommends = _.slice(data, 5, 10).map(item => {
        return _.omit(item, 'chapters');
    });

    const temp = {
        categoryRecommend: {
            xuanhuan,
            xianxia,
            junshi,
            dushi,
        },
        guessRecommends,
        hotRecommends,
    };

    return temp;
};

exports.bookStore = async (page, tagId) => {
    const values = spider.cache.values();
    if (tagId == 0) {
        return values.slice(20 * (page - 1), 20 * page).map(item => {
            return _.omit(item, 'chapters');
        });
    }
    return values
        .filter(item => {
            return item.tagId === tagId;
        })
        .slice(20 * (page - 1), 20 * page)
        .map(item => {
            return _.omit(item, 'chapters');
        });
};

exports.getNovelDetailById = async id => {
    const _db = spider.cache;

    let novel = _db.get(utils.md5(`https://www.ddxsku.com/xiaoshuo/${id}.html`));
    const chapters = novel.chapters;
    novel = _.omit(novel, 'chapters');

    const otherItems = _db
        .values()
        .slice(0, 10)
        .map(item => {
            return {
                name: item.name,
                author: item.author,
                picUrl: item.picUrl,
                id: item.index,
            };
        });

    return {
        novel: { ...novel, id },
        otherItems,
        lastChapter: chapters[chapters.length - 1],
        startChapter: chapters[0],
    };
};

exports.getCatalogByNovelId = async id => {
    const _db = spider.cache;

    let novel = _db.get(utils.md5(`https://www.ddxsku.com/xiaoshuo/${id}.html`));
    const chapters = novel.chapters;
    novel = _.omit(novel, 'chapters');

    return {
        novel: { ...novel, id },
        chapters,
    };
};

exports.getChapterDataById = async (novelId, chapterId) => {
    const _db = spider.cache;
    let novel = _db.get(utils.md5(`https://www.ddxsku.com/xiaoshuo/${novelId}.html`));
    const chapters = novel.chapters;
    novel = _.omit(novel, 'chapters');

    const [chapter] = await new ChapterCrawler().crawlChapterContent(
        `https://www.ddxsku.com/files/article/html/${novelId.substring(0, 2)}/${novelId}/${chapterId}.html`
    );

    let prevChapter = null,
        nextChapter = null;

    for (let i = 0; i < chapters.length; i++) {
        if (chapters[i].id === chapterId) {
            prevChapter = i - 1 >= 0 ? chapters[i - 1] : null;
            nextChapter = chapters.length > i + 1 ? chapters[i + 1] : null;
            break;
        }
    }

    return {
        prevChapter,
        nextChapter,
        chapter: { ...chapter, id: chapterId },
        novel: { ...novel, id: novelId },
    };
};
