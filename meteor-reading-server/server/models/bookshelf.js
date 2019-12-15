const Sequelize = require('sequelize');
const db = require('./db');

const { STRING, INTEGER } = Sequelize.DataTypes;

module.exports = db.define(
    'bookshelf',
    {
        novel_id: {
            type: STRING,
            required: true,
        },
        user_id: {
            type: INTEGER,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
