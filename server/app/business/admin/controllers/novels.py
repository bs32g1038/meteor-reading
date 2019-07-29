from fastapi import APIRouter

from app.business.admin import services
from app.business.admin.models.responses.novel import NovelListResponseModel, NovelOneResponseModel
from app.schemas.pagination import Pagination
from app.utils.helper import get_offset_limit_from_pagination
from app.utils.reponse import return_ok

router = APIRouter()


@router.get("/v1/admin-api/novels", response_model=NovelListResponseModel)
async def index(page: int = 1, page_size: int = 10):
    offset, limit = get_offset_limit_from_pagination(Pagination(page=page, limit=page_size))
    rows = await services.novel.get_all({"offset": offset, "limit": limit})
    countRow = await services.novel.count()
    return return_ok({"results": rows, "count": countRow["count"]})


@router.get("/v1/admin-api/novels/{id}", response_model=NovelOneResponseModel)
async def one(id: int):
    row = await services.novel.get_by_id(id)
    return return_ok(row)
