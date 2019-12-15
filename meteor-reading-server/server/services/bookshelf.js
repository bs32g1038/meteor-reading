const models = require('../models');
const spider = require('../../src/novel-spider');
const utils = require('utility');
const _ = require('lodash');

exports.addBookshelf = async (novelId, userId) => {
    return await models.bookshelf.create({
        novel_id: novelId,
        user_id: userId,
    });
};

exports.getRecords = async userId => {
    const records = await models.bookshelf.findAll({
        where: {
            user_id: userId,
        },
    });
    const _cache = spider.cache;
    return records
        .map(item => {
            const novel = _cache.get(utils.md5(`https://www.ddxsku.com/xiaoshuo/${item.novel_id}.html`));
            if (!novel) {
                return null;
            }
            novel.lastChapter = novel.chapters[novel.chapters.length - 1];
            return _.omit(novel, 'chapters');
        })
        .filter(item => item);
};

exports.delRecord = async novelId => {
    const record = await models.bookshelf.destroy({
        where: {
            novel_id: novelId,
        },
    });
    return record;
};

exports.isExistBookShelf = async novelId => {
    const record = await models.bookshelf.findOne({
        where: {
            novel_id: novelId,
        },
    });
    return record;
};
