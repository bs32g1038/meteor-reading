const Sequelize = require('sequelize');
const db = require('./db');

const { STRING, INTEGER, BOOLEAN, TEXT } = Sequelize.DataTypes;

module.exports = db.define('crawler_novel', {
    name: {
        type: STRING,
        required: true
    },
    fingerprint: {
        // name + author md5
        type: STRING,
        unique: true
    },
    // 缩略图
    pic: {
        type: STRING
    },
    summary: {
        type: TEXT,
        required: true
    },
    author: {
        type: STRING,
        required: true
    },
    tag_id: {
        type: INTEGER,
        defaultValue: 0
    },
    sum_words: {
        type: INTEGER,
        defaultValue: 0
    },
    status: {
        type: BOOLEAN,
        defaultValue: false
    },
    is_deleted: {
        type: BOOLEAN,
        defaultValue: false
    },
    last_chapter_id: {
        type: INTEGER
    }
}, {
    timestamps: true
});