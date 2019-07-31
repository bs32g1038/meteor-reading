const pathToRegexp = require('path-to-regexp');
const logger = require('../logger');

exports.parse = ($) => {
    let arr = [];
    $('#at').find('td').each(function (i) {
        const title = $(this).children('a').text().trim();
        const chapterUrl = $(this).children('a').attr('href').trim();
        const reg = pathToRegexp('https://www.23us.so/files/article/html/:num/:novelId/:chapterId.html');
        const rs = reg.exec(chapterUrl);  // 章节id
        if (!rs || rs.length < 3) {
            logger.chapter_error.error('网站链接结构发生改变，退出程序');
            return process.exit(1);
        }
        if (!title || !chapterUrl) {
            return null;
        }
        arr.push({
            chapterUrl: chapterUrl,
            title: title,
            index: rs[3]
        });
    });
    return arr;
};