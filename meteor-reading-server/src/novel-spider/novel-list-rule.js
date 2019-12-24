/**
 * 小说列表解析规则类
 * 目标列表：https://www.23us.so/top/allvisit_${page}.html
 * 获取小说列表中的小说详情链接，小说名，章节列表链接
 * return []
 */
const config = require('../config');
const { pathToRegexp } = require("path-to-regexp");
const URL = require('url');

exports.getAimUrl = (page) => {
    return config.AIM_LIST_PAGE_URL.replace('${page}', page);
};

exports.parse = ($) => {
    const arr = [];
    $('#content').find('tr').each(function (i) {
        if (i == 0) {
            return;
        }
        const name = $(this).find('td').first().children('a').text().trim();
        const url = $(this).find('td').first().children('a').attr('href').trim();
        const chapterListUrl = $(this).find('td').eq(1).children('a').attr('href').trim();

        const p = URL.parse(url);
        const result = pathToRegexp('/xiaoshuo/:id.html').exec(p.path);
        if (!result) {
            return;
        }
        arr.push({
            name,
            url,
            chapterListUrl,
            id: result[1],
        });
    });
    return arr;
};