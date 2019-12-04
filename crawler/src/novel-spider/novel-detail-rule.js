/**
 * 小说详情解析规则类
 * 该规则依赖于 NovelLinkListRule 类提供的url
 * 解析小说详情信息，包括picUrl，summary，tagId，author，status，sumWords，lastUpdated
 * return {}
 */
const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
    name: Joi.string().min(1).max(200).required(),
    summary: Joi.string().default(''),
    author: Joi.string().min(1).max(200).required(),
    tagId: Joi.number().min(1).max(10).required(),
    picUrl: Joi.string().min(1).max(200).required(),
    status: Joi.number().min(0).max(1).required(),
    sumWords: Joi.number().required(),
    lastUpdatedAt: Joi.string().default('') 
});

const TAG = {
    '玄幻奇幻': 1,
    '玄幻魔法': 1,
    '武侠修真': 2,
    '武侠仙侠': 2,
    '都市言情': 3,
    '历史军事': 4,
    '网游竞技': 5,
    '科幻灵异': 6,
    '恐怖灵异': 7,
    '女频频道': 8,
    '其他小说': 9
};

const STATUS = { '连载中': 0, '完本': 1 };

exports.parse = ($) => {
    const name = $('#content').find('dd').eq(0).text().replace(' 全文阅读', '');
    const trs = $('#at').find('tr');
    const summary = $('#sidename').prev('p').text().trim();
    const author = trs.eq(0).find('td').eq(1).text().trim();
    const tagId = trs.eq(0).find('td').eq(0).children('a').text().trim();
    const picUrl = $('#content').find('a img').attr('src');
    const status = trs.eq(0).find('td').eq(2).text().trim();
    const sumWords = trs.eq(1).find('td').eq(1).text().trim().replace('字', '');
    const lastUpdatedAt = trs.eq(1).find('td').eq(2).text().trim();
    const result = schema.validate({
        picUrl,
        summary,
        tagId: TAG[tagId],
        author,
        status: STATUS[status],
        sumWords,
        name,
        lastUpdatedAt
    });
    if (result.error) {
        return null;
    }
    return result.value;
};
