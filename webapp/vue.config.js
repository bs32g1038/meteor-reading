const path = require('path');
const express = require('express');

module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:8000',
                    ws: true,
                    changeOrigin: true
                }
            },
            setup: function(app, server) {
                app.use('/static', express.static(path.resolve(__dirname, './public/temp')));
                app.use('/public/novel-images', express.static(path.resolve(__dirname, '../crawler/images')));
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/public/webapp/'
        : '/'
};
