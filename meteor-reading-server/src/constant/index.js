/**
 * 数据常量标识
 */

// 小说url md5集合, 用于判断是否已经抓取了
exports.NOVEL_URL_MD5_SET = "NOVEL_URL_MD5_SET";

// 小说的URL 列表， 用于是否需要快速更新，避免再次在抓取url链接
exports.NOVEL_URL_LIST = "NOVEL_URL_LIST";

// 小说图片url md5集合, 用于判断是否已经抓取了
exports.NOVEL_IMAGE_URL_MD5_SET = "NOVEL_IMAGE_URL_MD5_SET";

// 小说指向的章节列表页url MD5 映射到小说的objectId
exports.CHAPTER_PAGE_URL_MD5_MAP_NOVEL_ID = "CHAPTER_PAGE_URL_MD5_MAP_NOVEL_ID";

// 小说数据临时存放列表
exports.CACHE_NOVEL_LIST = 'CACHE_NOVEL_LIST';

// 小说章节页url 列表，用于快速查找章节
exports.CHAPTER_PAGE_URL_LIST = "CHAPTER_PAGE_URL_LIST";

// 章节url md5集合, 用于判断是否已经抓取了
exports.CHAPTER_URL_MD5_SET = "CHAPTER_URL_MD5_SET";

// 小说图片url 列表
exports.NOVEL_IMAGE_URL_URL = "NOVEL_IMAGE_URL_URL";

// 小说章节数据临时存放列表
exports.CACHE_CHAPTER_LIST = 'CACHE_CHAPTER_LIST';

// 小说指纹，由小说名 + 作者 经md5生成。
exports.NOVEL_FINGERPRINT = 'NOVEL_FINGERPRINT';

// 章节指纹, 由小说id + 章节标题 经md5生成。
exports.CHAPTER_FINGERPRINT = 'CHAPTER_FINGERPRINT';