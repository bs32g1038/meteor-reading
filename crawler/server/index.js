let restify = require('restify');
const novel = require('./services/novel');

const server = restify.createServer({
    name: 'novel-api',
    version: '1.0.0',
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/v1/api/home/info', async function(req, res, next) {
    res.json({
        code: 20000,
        data: await novel.getNovelList(),
        message: 'ok',
    });
    return next();
});

server.get('/v1/api/book/store', async (req, res, next) => {
    res.json({
        code: 20000,
        data: await novel.bookStore(req.query.page, req.query.tagId),
        message: 'ok',
    });
    return next();
});

server.get('/v1/api/book/detail/:id', async (req, res, next) => {
    res.json({
        code: 20000,
        data: await novel.getNovelDetailById(req.params.id),
        message: 'ok',
    });
    return next();
});

server.get('/v1/api/book/catalog', async (req, res, next) => {
    res.json({
        code: 20000,
        data: await novel.getCatalogByNovelId(req.query.novelId),
        message: 'ok',
    });
    return next();
});

server.get('/v1/api/book/:novelId/read/:chapterId', async (req, res, next) => {
    res.json({
        code: 20000,
        data: await novel.getChapterDataById(req.params.novelId, req.params.chapterId),
        message: 'ok',
    });
    return next();
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
