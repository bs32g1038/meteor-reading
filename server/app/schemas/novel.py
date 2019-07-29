from datetime import datetime
from app.schemas.base import BaseSchema, SchemaValue


class NovelIdSchema(BaseSchema):
    id: int = SchemaValue(None, title='小说id')


class NovelNameSchema(BaseSchema):
    name: str = SchemaValue(None, title='小说名称')


class NovelCreatedAtSchema(BaseSchema):
    created_at: datetime = SchemaValue(None, title='创建时间', alias='createdAt')


class NovelUpdatedAtSchema(BaseSchema):
    updated_at: datetime = SchemaValue(None, title='更新时间', alias='updatedAt')


class NovelSchema(BaseSchema):
    id: int = SchemaValue(None, title='小说id')
    author: str = SchemaValue(None, title='小说作者', min_length=1)
    name: str = SchemaValue(None, title='小说名称')
    pic: str = SchemaValue(None, title='小说缩略图')
    status: bool = SchemaValue(None, title='小说状态，表示是否完结')
    tag_id: int = SchemaValue(None, title='小说分类id', alias='tagId')
    sum_words: int = SchemaValue(None, title='小说字数', alias='sumWords')
    summary: str = SchemaValue(None, title='小说简介')
    created_at: datetime = SchemaValue(None, title='创建时间', alias='createdAt')
    updated_at: datetime = SchemaValue(None, title='更新时间', alias='updatedAt')
