exports.AIM_LIST_PAGE_URL = "https://www.23us.so/top/allvisit_${page}.html";

exports.dbConfig = {
    database: 'read_dev',
    username: 'postgres',
    password: '123456',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres', // 'mysql'|'sqlite'|'postgres'|'mssql'
};