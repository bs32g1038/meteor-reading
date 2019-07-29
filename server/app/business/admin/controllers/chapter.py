from fastapi import APIRouter
from starlette.requests import Request

from app.business.admin import services
from app.business.admin.models.responses.chapter import ChapterListResponseModel
from app.redis import cache
from app.schemas.pagination import LargePagination
from app.tables.chapter import chapters
from app.utils.helper import get_offset_limit_from_pagination
from app.utils.reponse import return_ok

router = APIRouter()


@router.get("/v1/admin-api/chapters", response_model=ChapterListResponseModel)
async def index(
    request: Request, page: int = 1, page_size: int = 20, novel_id: int = -1
):
    offset, limit = get_offset_limit_from_pagination(
        LargePagination(page=page, limit=page_size)
    )
    if novel_id != -1:
        rows = await services.chapter.get_chapters_by_novel_id(
            novel_id, offset=offset, limit=limit
        )
        countRow = await services.chapter.count(
            where=(chapters.c.novel_id == novel_id,)
        )
    else:
        rows = await services.chapter.get_all({"offset": offset, "limit": limit})
        countRow = await cache.hget(
            "cache", "{}{}".format(request.url.path, "@" + str(novel_id) + "@count")
        )
        if not countRow:
            countRow = await services.chapter.count(limit=50000)
            await cache.hset(
                "cache",
                "{}{}".format(request.url.path, "@" + str(novel_id) + "@count"),
                countRow,
            )
    return return_ok({"results": rows, "count": countRow["count"]})
