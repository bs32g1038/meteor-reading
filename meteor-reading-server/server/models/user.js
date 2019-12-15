const Sequelize = require('sequelize');
const db = require('./db');

const { STRING } = Sequelize.DataTypes;

module.exports = db.define(
    'user',
    {
        nickname: {
            type: STRING,
            required: true,
        },
        account: {
            type: STRING,
            unique: true,
        },
        email: {
            type: STRING,
            unique: true,
        },
        password: {
            type: STRING,
            required: true,
        },
        avatar: {
            type: STRING,
        },
    },
    {
        timestamps: true,
    }
);
