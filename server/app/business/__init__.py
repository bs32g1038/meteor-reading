from app.business import admin, web


def init(app):
    web.init(app)
    admin.init(app)
