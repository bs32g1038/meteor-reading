from app.schemas.response import ResponseBaseSchema
from typing import List
from app.schemas.chapter import ChapterSchema
from pydantic import BaseModel


class ChapterListResponseModel(ResponseBaseSchema):
    class ChapterListData(BaseModel):
        results: List[ChapterSchema] = None
        count: int = 0
    data: ChapterListData
