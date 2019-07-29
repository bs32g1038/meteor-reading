from fastapi import APIRouter

from app.business.admin import services
from app.utils.reponse import return_ok

router = APIRouter()


@router.get("/v1/admin-api/home/info")
async def getHomeInfo():

    novelRow = await services.novel.count()
    chapterRow = await services.chapter.count()
    userRow = await services.user.count()

    return return_ok(
        {
            "novelCount": novelRow["count"],
            "chapterCount": chapterRow["count"],
            "userCount": userRow["count"],
            "visitCount": 0,
        },
        code=20000,
    )
