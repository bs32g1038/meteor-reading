const Sequelize = require('sequelize');
const db = require('./db');

const { STRING, INTEGER, TEXT } = Sequelize.DataTypes;

module.exports = db.define(
    'crawler_chapter',
    {
        title: {
            type: STRING,
            required: true,
        },
        sum_words: {
            type: INTEGER,
            defaultValue: 0,
        },
        novel_id: {
            type: INTEGER,
            required: true,
        },
        index: {
            type: INTEGER,
            required: true,
        },
        fingerprint: {
            // title + novelId md5
            type: STRING,
            unique: true,
        },
        content: {
            type: TEXT,
        },
    },
    {
        timestamps: true,
        indexes: [
            {
                name: 'crawler_chapter_novel_id_index_index',
                method: 'BTREE',
                fields: ['novel_id', 'index'],
            },
        ],
    }
);
