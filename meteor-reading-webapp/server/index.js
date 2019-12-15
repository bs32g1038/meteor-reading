const express = require('express');
const path = require('path');
const fs = require('fs');
const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
const consola = require('consola');

express()
    .disable('x-powered-by')
    .use('/public/webapp', express.static(path.resolve(__dirname, '../dist')))
    .use('/static', express.static(path.resolve(__dirname, '../public/temp')))
    .use('/public/novel-images', express.static(path.resolve(__dirname, '../public/crawler-images')))
    .get('/*', (req, res) => {
        res.send(html);
    }).listen(7000, '0.0.0.0', function(err) {
        if (err) {
            consola.error('服务器启动失败！');
        };
        consola.success('App running at: - Local:   http://localhost:7000/');
    });
