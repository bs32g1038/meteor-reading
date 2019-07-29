from fastapi import APIRouter

from app.schemas.pagination import Pagination
from app.utils.helper import get_offset_limit_from_pagination
from app.utils.reponse import return_ok

from .. import services
from ..models.responses.book import (
    BookCatalogResponseModel,
    BookDetailResponseModel,
    BookReadResponseModel,
    BookStoreResponseModel,
    KeyWordsResponseModel,
    SearchResultResponseModel,
)

router = APIRouter()

TAG = "小说"


@router.get(
    "/v1/api/book/store",
    response_model=BookStoreResponseModel,
    summary="获取书库小说列表",
    tags=[TAG],
)
async def book_store(page: int = 1, limit: int = 10, tagId: int = 0):
    """
    query参数:
    - **page**: 页码
    - **limit**: 获取的条目数
    - **tagId**: 分类id
    """
    offset, limit = get_offset_limit_from_pagination(Pagination(page=page, limit=limit))
    if tagId == 0:
        rows = await services.novel.get_novels(offset, limit)
    else:
        rows = await services.novel.get_novels_by_tag_id(tagId, offset, limit)
    return return_ok(rows)


@router.get(
    "/v1/api/book/detail/{novel_id}",
    summary="获取小说详情",
    response_model=BookDetailResponseModel,
    tags=[TAG],
)
async def book_detail(novel_id: int):
    novel = await services.novel.get_by_id(novel_id)
    otherItems = await services.novel.get_brief_novels(limit=10)
    startChapter = await services.chapter.get_start_chapter(novel_id)
    lastChapter = await services.chapter.get_last_chapter(novel_id)
    return return_ok(
        {
            "novel": novel,
            "otherItems": otherItems,
            "startChapter": startChapter,
            "lastChapter": lastChapter,
        }
    )


@router.get(
    "/v1/api/book/read/{id}",
    summary="获取阅读章节",
    response_model=BookReadResponseModel,
    tags=[TAG],
)
async def book_read(id: int):
    chapter = await services.chapter.get_by_id(id)
    novel = await services.novel.get_by_id(
        chapter["novel_id"],
        columns=[services.novel.table.c.id, services.novel.table.c.name],
    )
    prevChapter = await services.chapter.get_pre_chapter(
        chapter["novel_id"], chapter["index"]
    )
    nextChapter = await services.chapter.get_next_chapter(
        chapter["novel_id"], chapter["index"]
    )
    return return_ok(
        {
            "novel": novel,
            "chapter": chapter,
            "prevChapter": prevChapter,
            "nextChapter": nextChapter,
        }
    )


@router.get(
    "/v1/api/book/catalog",
    summary="获取小说章节目录",
    response_model=BookCatalogResponseModel,
    tags=[TAG],
)
async def book_catalog(novelId: int = -1):
    chapters = await services.chapter.get_catalog(novelId)
    novel = await services.novel.get_by_id(
        novelId, columns=[services.novel.table.c.id, services.novel.table.c.name]
    )
    return return_ok({"novel": novel, "chapters": chapters})


@router.get(
    "/v1/api/key-wrods",
    summary="随机获取小说标题",
    response_model=KeyWordsResponseModel,
    tags=[TAG],
)
async def get_key_words():
    novels = await services.novel.get_random_novels()
    return return_ok(novels)


@router.get(
    "/v1/api/search",
    summary="获取小说搜索结果",
    response_model=SearchResultResponseModel,
    tags=[TAG],
)
async def get_search_result(kw: str = ""):
    novels = await services.novel.get_search_result(kw)
    return return_ok(novels)
