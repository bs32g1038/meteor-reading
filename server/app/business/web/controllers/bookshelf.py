import datetime

from fastapi import APIRouter, Depends

from app.business.web import services
from app.business.web.models.forms.bookshelf import BookshelfFormModel
from app.business.web.models.responses.base import BaseResponseModel
from app.business.web.models.responses.bookshelf import (
    AddBookToShelfResponseModel,
    BookShelfRecordResponseModel,
    IsExistBookShelfResponseModel,
)
from app.utils.reponse import return_ok
from app.utils.request import get_user_id

router = APIRouter()

TAG = "书架"


@router.post(
    "/v1/api/book-shelf",
    response_model=AddBookToShelfResponseModel,
    summary="添加书架记录",
    tags=[TAG],
)
async def AddBookToShelf(
    bookshelf: BookshelfFormModel, user_id: int = Depends(get_user_id)
):
    novel_id = bookshelf.novelId
    novel = await services.bookshelf.is_have_record(novel_id, user_id)
    if novel:
        return return_ok(None, code=20001)
    id = await services.bookshelf.insert(
        novel_id=novel_id,
        user_id=user_id,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now(),
    )
    return return_ok({"id": id})


@router.get(
    "/v1/api/book-shelf/records",
    response_model=BookShelfRecordResponseModel,
    summary="获取书架记录",
    tags=[TAG],
)
async def GetBookShelfRecord(user_id: int = Depends(get_user_id)):
    results = await services.bookshelf.get_bookshelf_record(user_id)
    return return_ok(results)


@router.delete(
    "/v1/api/book-shelf/{novel_id}",
    response_model=BaseResponseModel,
    summary="删除书架记录",
    tags=[TAG],
)
async def DelBookShelfRecord(novel_id: int, user_id: int = Depends(get_user_id)):
    await services.bookshelf.delete(
        (
            services.bookshelf.table.c.novel_id == novel_id,
            services.bookshelf.table.c.user_id == user_id,
        )
    )
    return return_ok(None)


@router.post(
    "/v1/api/is-exist-book-shelf",
    response_model=IsExistBookShelfResponseModel,
    summary="书架是否有该小说记录",
    tags=[TAG],
)
async def IsExistBookShelf(
    bookshelf: BookshelfFormModel, user_id: int = Depends(get_user_id)
):
    novel_id = bookshelf.novelId
    novel = await services.bookshelf.is_have_record(novel_id, user_id)
    if novel:
        return return_ok(True, message="小说已经存在书架中", code=20001)
    return return_ok(False)
