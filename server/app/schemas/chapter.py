from datetime import datetime
from app.schemas.base import BaseSchema, SchemaValue


class ChapterIdSchema(BaseSchema):
    id: int = SchemaValue(None, title="章节id")


class ChapterTitleSchema(BaseSchema):
    title: str = SchemaValue(None, title="章节标题", min_length=1)


class ChapterCreatedAtSchema(BaseSchema):
    created_at: datetime = SchemaValue(None, title="创建时间", alias="createdAt")


class ChapterUpdatedAtSchema(BaseSchema):
    updated_at: datetime = SchemaValue(None, title="更新时间", alias="updatedAt")


class ChapterBaseSchema(BaseSchema):
    id: int = SchemaValue(None, title="章节id")
    title: str = SchemaValue(None, title="章节标题", min_length=1)
    created_at: datetime = SchemaValue(None, title="创建时间", alias="createdAt")
    updated_at: datetime = SchemaValue(None, title="更新时间", alias="updatedAt")


class ChapterSchema(BaseSchema):
    id: int = SchemaValue(None, title="章节id")
    novel_id: int = SchemaValue(None, title="小说id", alias="novelId")
    title: str = SchemaValue(None, title="章节标题", min_length=1)
    content: str = SchemaValue(None, title="章节内容")
    sum_words: int = SchemaValue(None, title="章节字数", alias="sumWords")
    index: int = SchemaValue(None, title="章节序号")
    created_at: datetime = SchemaValue(None, title="创建时间", alias="createdAt")
    updated_at: datetime = SchemaValue(None, title="更新时间", alias="updatedAt")
