from .controllers import bookshelf, captcha, home, novel, user


def init(app):
    app.include_router(home.router)
    app.include_router(novel.router)
    app.include_router(bookshelf.router)
    app.include_router(captcha.router)
    app.include_router(user.router)
