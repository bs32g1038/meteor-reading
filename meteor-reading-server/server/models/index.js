const db = require('./db');
const user = require('./user');
const bookshelf = require('./bookshelf');

db.sync();

exports.db = db;
exports.user = user;
exports.bookshelf = bookshelf;