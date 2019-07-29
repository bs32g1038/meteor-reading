from .controllers import chapter, dashboard, novels, user


def init(app):
    app.include_router(dashboard.router)
    app.include_router(novels.router)
    app.include_router(chapter.router)
    app.include_router(user.router)
