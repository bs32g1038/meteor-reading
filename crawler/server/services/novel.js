const NovelCrawler = require('../../src/novel-spider');
const ChapterCrawler = require('../../src/chapter-spider');
let LRU = require('lru-cache'),
    options = {
        max: 5000,
        maxAge: 1000 * 60 * 60 * 24,
    },
    cache = new LRU(options);

const filterArrayEmptyObject = arr => {
    return arr.filter(item => {
        if (item) {
            return true;
        }
        return false;
    });
};

const xuanhuanUrl = 'https://www.ddxsku.com/list/1_1.html';
const xianxiaUrl = 'https://www.ddxsku.com/list/2_1.html';
const junshiUrl = 'https://www.ddxsku.com/list/3_1.html';
const dushiUrl = 'https://www.ddxsku.com/list/4_1.html';
const hotUrl = 'https://www.ddxsku.com/top/monthvisit_1.html';
const guessUrl = 'https://www.ddxsku.com/top/postdate_1.html';

exports.getNovelList = async () => {
    const d = cache.get('home-data');
    if (d) {
        return d;
    }

    const arrs = await new NovelCrawler([xuanhuanUrl, xianxiaUrl, junshiUrl, dushiUrl, hotUrl, guessUrl], 5).start();

    const newArrs = arrs.map(arr => {
        return filterArrayEmptyObject(arr);
    });

    const [xuanhuan, xianxia, junshi, dushi, hotRecommends, guessRecommends] = newArrs;

    const data = {
        categoryRecommend: {
            xuanhuan,
            xianxia,
            junshi,
            dushi,
        },
        guessRecommends,
        hotRecommends,
    };

    cache.set('home-data', data);
    return data;
};

exports.bookStore = async (page, tagId) => {
    let url = `https://www.ddxsku.com/list/${tagId}_${page}.html`;
    if (tagId == 0) {
        url = `https://www.ddxsku.com/top/allvote_${page}.html`;
    }
    const [data] = await new NovelCrawler([url]).start();
    const arr = data.filter(item => {
        if (item) {
            return true;
        }
        return false;
    });
    return arr;
};

exports.getNovelDetailById = async id => {
    const OTHER_ITEMS_KEY = Symbol('other-items');
    let otherItems;
    if (cache.get(OTHER_ITEMS_KEY)) {
        otherItems = cache.get(OTHER_ITEMS_KEY);
    }
    const otherItemsUrl = 'https://www.ddxsku.com/top/allvote_1.html';
    const [_otherItems] = await new NovelCrawler([otherItemsUrl], 10).start();
    otherItems = _otherItems;
    cache.set(OTHER_ITEMS_KEY, otherItems);

    const url = `https://www.ddxsku.com/xiaoshuo/${id}.html`;
    const [novel] = await new NovelCrawler().crawlNovelDetail([{ url }]);

    const chapters = await new ChapterCrawler(
        `https://www.ddxsku.com/files/article/html/${id.substring(0, 2)}/${id}/index.html`
    ).start();

    return {
        novel: { ...novel, id },
        otherItems,
        lastChapter: chapters[0][chapters[0].length - 1],
        startChapter: chapters[0][0],
    };
};

exports.getCatalogByNovelId = async id => {
    const url = `https://www.ddxsku.com/xiaoshuo/${id}.html`;
    const [novel] = await new NovelCrawler().crawlNovelDetail([{ url }]);

    const chapters = await new ChapterCrawler(
        `https://www.ddxsku.com/files/article/html/${id.substring(0, 2)}/${id}/index.html`
    ).start();

    return {
        novel: { ...novel, id },
        chapters: chapters[0],
    };
};

exports.getChapterDataById = async (novelId, chapterId) => {
    const url = `https://www.ddxsku.com/xiaoshuo/${novelId}.html`;
    const [novel] = await new NovelCrawler().crawlNovelDetail([{ url }]);

    const [chapter] = await new ChapterCrawler().crawlChapterContent(
        `https://www.ddxsku.com/files/article/html/${novelId.substring(0, 2)}/${novelId}/${chapterId}.html`
    );

    const [chapters] = await new ChapterCrawler(
        `https://www.ddxsku.com/files/article/html/${novelId.substring(0, 2)}/${novelId}/index.html`
    ).start();

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
