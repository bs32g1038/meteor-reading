from typing import List

from pydantic import BaseModel

from app.schemas.base import SchemaValue
from app.schemas.chapter import ChapterIdSchema, ChapterSchema, ChapterTitleSchema
from app.schemas.novel import BaseSchema, NovelIdSchema, NovelNameSchema, NovelSchema
from app.schemas.response import ResponseBaseSchema


# 书库
class BookStoreResponseModel(ResponseBaseSchema):
    data: List[NovelSchema]


# 小说目录
class BookCatalogResponseModel(ResponseBaseSchema):
    class BookCatalogData(BaseModel):
        class BookCatalogNovelSchema(NovelNameSchema, NovelIdSchema):
            pass

        class BookCatalogChaptersSchema(ChapterTitleSchema, ChapterIdSchema):
            pass

        novel: BookCatalogNovelSchema = SchemaValue(None)
        chapters: List[BookCatalogChaptersSchema] = SchemaValue(None)

    data: BookCatalogData


# 小说详情
class BookDetailResponseModel(ResponseBaseSchema):
    class BookDetailData(BaseSchema):
        novel: NovelSchema = SchemaValue(None)
        otherItems: List[NovelSchema] = SchemaValue(None)
        startChapter: ChapterSchema = SchemaValue(None)
        lastChapter: ChapterSchema = SchemaValue(None)

    data: BookDetailData


# 小说阅读
class BookReadResponseModel(ResponseBaseSchema):
    class BookReadData(BaseSchema):
        novel: NovelSchema = SchemaValue(None)
        chapter: ChapterSchema = SchemaValue(None)
        prevChapter: ChapterSchema = SchemaValue(None)
        nextChapter: ChapterSchema = SchemaValue(None)

    data: BookReadData


# 小说搜索关键词
class KeyWordsResponseModel(ResponseBaseSchema):
    class KeyWordsData(NovelNameSchema, NovelIdSchema):
        pass

    data: List[KeyWordsData]


# 小说搜索结果
class SearchResultResponseModel(ResponseBaseSchema):
    data: List[NovelSchema]
