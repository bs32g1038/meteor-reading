const cheerio = require('cheerio');

exports.parse = (document) => {
    const $ = cheerio.load(document, { decodeEntities: false });
    return {
        content: $('#contents').html()
    };
};