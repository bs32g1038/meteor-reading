const pLimit = require('p-limit');
const axios = require('axios');
const delay = require('delay');
const cheerio = require('cheerio');

class Crawler {
    constructor(option) {
        this.config = {
            maxConnections: 1,
            rateLimit: 0,
            request: { method: 'GET', responseType: 'text' },
            cheerio: {},
            callback: async () => {},
            ...option,
        };
        this.exec = pLimit(this.config.maxConnections);
        this.tasks = [];
    }
    async request(url, context = {}) {
        await delay(this.config.rateLimit);
        return axios({ ...this.config.request, url })
            .then(res => {
                let $ = res.data;
                if (this.config.cheerio) {
                    $ = cheerio.load(res.data, this.config.cheerio);
                }
                return this.config.callback(null, $, context);
            })
            .catch(err => {
                return this.config.callback(err, null, context);
            });
    }
    queue(url, context) {
        this.tasks.push(this.exec(this.request.bind(this), url, context));
    }
    async start() {
        return await Promise.all(this.tasks).catch(err => {
            console.log(err);
        });
    }
}

module.exports = Crawler;
