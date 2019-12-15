const Sequelize = require('sequelize');
const path = require('path');

module.exports = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../db/database.sqlite'),
});
