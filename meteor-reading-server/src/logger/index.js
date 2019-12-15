const log4js = require('log4js');
const path = require('path');
const dayjs = require('dayjs');
log4js.configure({
    appenders: {
        out: {
            type: 'stdout'
        },
        system: {
            type: 'file',
            filename: path.resolve(__dirname, '../logs/system.log')
        },
        novel: {
            type: 'multiFile',
            // filename: path.resolve(__dirname, '../logs/novel.log'),
            base: path.resolve(__dirname, '../logs'),
            property: 'time',
            maxLogSize: 512000,
            backups: 3,
            compress: true,
            extension: '.log',
            layout: { type: 'messagePassThrough' }
        },
        novel_error: {
            type: 'file',
            filename: path.resolve(__dirname, '../logs/novel_error.log')
        },
        chapter: {
            type: 'multiFile',
            // filename: path.resolve(__dirname, '../logs/novel.log'),
            base: path.resolve(__dirname, '../logs'),
            property: 'time',
            maxLogSize: 512000,
            backups: 3,
            compress: true,
            extension: '.log',
            layout: { type: 'messagePassThrough' }
        },
        chapter_error: {
            type: 'file',
            filename: path.resolve(__dirname, '../logs/chapter_error.log')
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'debug'
        },
        system: {
            appenders: ['system'],
            level: 'error'
        },
        novel: {
            appenders: ['novel'],
            level: 'info'
        },
        novel_error: {
            appenders: ['novel_error'],
            level: 'error'
        },
        chapter: {
            appenders: ['chapter'],
            level: 'info'
        },
        chapter_error: {
            appenders: ['chapter_error'],
            level: 'error'
        },
    }
});

const novel = log4js.getLogger('novel');
novel.addContext('time', 'novel_' + dayjs().format('YYYY-MM-DD'));
exports.novel = {
    info: function (str) {
        novel.info(`---------- [${dayjs().format('YYYY-MM-DD hh:mm:ss')}] INFO ----------`);
        novel.info(`${str}\n`);
    }
};
exports.novel_error = log4js.getLogger('novel_error');

const chapter = log4js.getLogger('chapter');
chapter.addContext('time', 'chapter_' + dayjs().format('YYYY-MM-DD'));
exports.chapter = {
    info: function (str) {
        chapter.info(`---------- [${dayjs().format('YYYY-MM-DD hh:mm:ss')}] INFO ----------`);
        chapter.info(`${str}\n`);
    }
};
exports.chapter_error = log4js.getLogger('chapter_error');

exports.system = log4js.getLogger('system');