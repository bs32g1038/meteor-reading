from typing import List

from app.schemas.base import SchemaValue
from app.schemas.bookshelf import BookshelfIdSchema
from app.schemas.chapter import (
    ChapterCreatedAtSchema,
    ChapterIdSchema,
    ChapterTitleSchema,
)
from app.schemas.novel import NovelSchema
from app.schemas.response import ResponseBaseSchema


class AddBookToShelfResponseModel(ResponseBaseSchema):
    class AddBookToShelfData(BookshelfIdSchema):
        pass

    data: AddBookToShelfData


class BookShelfRecordResponseModel(ResponseBaseSchema):
    class BookShelfRecordItem(NovelSchema):
        class BookShelfRecordDataLastChapter(
            ChapterCreatedAtSchema, ChapterTitleSchema, ChapterIdSchema
        ):
            pass

        lastChapter: BookShelfRecordDataLastChapter = SchemaValue(None)

    data: List[BookShelfRecordItem]


class IsExistBookShelfResponseModel(ResponseBaseSchema):
    data: bool
