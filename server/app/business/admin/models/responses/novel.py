from typing import List

from pydantic import BaseModel

from app.schemas.novel import NovelSchema
from app.schemas.response import ResponseBaseSchema


class NovelListResponseModel(ResponseBaseSchema):
    class NovelListData(BaseModel):
        results: List[NovelSchema] = None
        count: int = 0

    data: NovelListData


class NovelOneResponseModel(ResponseBaseSchema):
    data: NovelSchema
