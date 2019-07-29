from app.database.db import database
from fastapi import FastAPI
from starlette.config import Config
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import JSONResponse
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
from app.utils.reponse import return_not_authority
from app.redis.cache import Cache

from . import business

config = Config(".env")
SECRET_KEY = config("SECRET_KEY")
DEBUG = config("DEBUG")

app = FastAPI(
    debug=DEBUG,
    title="星点阅读",
    description="星点阅读后台api接口文档",
    version="1.0.0",
    # docs_url=None,
    # redoc_url=None
)


@app.on_event("startup")
async def startup():
    await database.connect()
    await Cache.init_redis()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


app.add_middleware(SessionMiddleware, secret_key=SECRET_KEY, max_age=2 * 60 * 60)


templates = Jinja2Templates(directory="templates")

app.mount("/static", StaticFiles(directory="statics"), name="static")


@app.get("/favicon.ico")
def favicon():
    return ""


@app.route("/error")
async def error(request):
    """
    An example error. Switch the `debug` setting to see either tracebacks or 500 pages.
    """
    raise RuntimeError("Oh no")


@app.exception_handler(404)
async def not_found(request, exc):
    """
    Return an HTTP 404 page.
    """
    template = "404.html"
    context = {"request": request}
    return templates.TemplateResponse(template, context, status_code=404)


@app.exception_handler(500)
async def server_error(request, exc):
    """
    Return an HTTP 500 page.
    """
    template = "500.html"
    context = {"request": request}
    return templates.TemplateResponse(template, context, status_code=500)


@app.exception_handler(401)
async def http_exception(request, exc):
    return return_not_authority(raw=True)


@app.route("/")
async def homepage(request):
    return JSONResponse({"test": "hello world!"})


business.init(app)
