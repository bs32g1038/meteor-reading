import asyncio
import random

from fastapi import APIRouter
from starlette.requests import Request

from app.business.web import services
from app.business.web.models.responses.home import HomeInfoResponseModel
from app.redis import cache
from app.utils.reponse import return_ok

TAG = "首页"
router = APIRouter()


@router.get(
    "/v1/api/home/info",
    response_model=HomeInfoResponseModel,
    summary="获取主页数据",
    tags=[TAG],
)
async def home_info(request: Request):

    homeData = await cache.hget("cache", request.url.path)

    if homeData:
        return return_ok(homeData)

    arr = [
        services.novel.get_novels_by_tag_id(tagId=(i + 1), offset=0, limit=8)
        for i in range(4)
    ]

    xuanhuan, xianxia, dushi, junshi = await asyncio.gather(*arr)

    hotRecommends = await services.novel.get_novels_order_by_updated_at(
        offset=0, limit=8, DESC=True
    )
    guessRecommends = await services.novel.get_novels(
        offset=random.randint(9, 20), limit=9
    )

    data = {
        "categoryRecommend": {
            "xuanhuan": xuanhuan,
            "xianxia": xianxia,
            "dushi": dushi,
            "junshi": junshi,
        },
        "hotRecommends": hotRecommends,
        "guessRecommends": guessRecommends,
        "banners": [
            "/static/upload/2019/1.jpg",
            "/static/upload/2019/2.jpg",
            "/static/upload/2019/3.jpg",
            "/static/upload/2019/4.jpg",
        ],
    }
    await cache.hset("cache", request.url.path, data)
    
    return return_ok(data=data)
