let restify = require('restify');
const novel = require('./services/novel');
const user = require('./services/user');
const bookshelf = require('./services/bookshelf');
const jwt = require('jsonwebtoken');
const config = require('./config');
const dayjs = require('dayjs');
const auth = require('./utils/auth');

const server = restify.createServer({
    name: 'meteor-reading-api',
    version: '1.0.0',
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

novel.crontabCrawler();

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

server.get('/v1/api/key-wrods', async (req, res, next) => {
    res.json({
        code: 20000,
        data: await novel.getKeyWords(),
        message: 'ok',
    });
    return next();
});

server.get('/v1/api/search', async (req, res, next) => {
    res.json({
        code: 20000,
        data: await novel.getSearchResult(req.query.kw),
        message: 'ok',
    });
    return next();
});

/**
 * 用户注册
 */
server.post('/v1/api/register', async (req, res, next) => {
    const rs = await user.register(req.body.email, req.body.password);
    if (rs === 1) {
        res.json({
            code: 1,
            data: null,
            message: '该用户已经存在',
        });
    } else {
        res.json({
            code: 20000,
            data: rs,
            message: 'ok',
        });
    }
    return next();
});

/**
 * 用户登录
 */
server.post('/v1/api/login', async (req, res, next) => {
    const rs = await user.login(req.body.email, req.body.password);
    if (!rs) {
        res.json({
            code: 1,
            msg: '账号不存在！',
        });
        return next();
    }
    res.json({
        code: 20000,
        msg: 'ok',
        data: {
            expire: dayjs().add(2, 'hour'),
            id: rs.id,
            token: jwt.sign({ id: rs.id, email: req.body.email }, config.token_secret_key, {
                expiresIn: 60 * 60 * 6,
            }),
        },
    });
    return next();
});

server.post('/v1/api/book-shelf', async (req, res, next) => {
    const _user = auth(req);
    if (!_user) {
        res.status(400);
        return res.json({
            code: 40100,
            msg: '请登录后再操作！',
        });
    }
    await bookshelf.addBookshelf(req.body.novelId, _user.id);
    res.json({});
    return next();
});

server.get('/v1/api/book-shelf/records', async (req, res, next) => {
    const _user = auth(req);
    if (!_user) {
        res.status(400);
        return res.json({
            code: 40100,
            msg: '请登录后再操作！',
        });
    }
    const items = await bookshelf.getRecords(_user.id);
    res.json({
        code: 20000,
        msg: 'ok',
        data: items,
    });
    return next();
});

server.del('/v1/api/book-shelf/:novelId', async (req, res, next) => {
    const _user = auth(req);
    if (!_user) {
        res.status(400);
        return res.json({
            code: 40100,
            msg: '请登录后再操作！',
        });
    }
    const item = await bookshelf.delRecord(req.params.novelId);
    res.json({
        code: 20000,
        msg: 'ok',
        data: item,
    });
    return next();
});

server.post('/v1/api/is-exist-book-shelf', async (req, res, next) => {
    const _user = auth(req);
    if (!_user) {
        res.status(400);
        return res.json({
            code: 40100,
            msg: '请登录后再操作！',
        });
    }
    const book = await bookshelf.isExistBookShelf(req.body.novelId);
    if (!book) {
        res.status(404);
        return res.json();
    }
    res.json({
        code: 20000,
        msg: 'ok',
        data: true,
    });
    return next();
});

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
