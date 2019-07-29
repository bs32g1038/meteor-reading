from app.schemas.response import ResponseBaseSchema
from app.schemas.base import BaseSchema, SchemaValue
from app.schemas.novel import NovelSchema
from typing import List


class HomeInfoResponseModel(ResponseBaseSchema):
    class HomeInfoData(BaseSchema):
        class CategoryRecommendData(BaseSchema):
            xuanhuan: List[NovelSchema]
            xianxia: List[NovelSchema]
            dushi: List[NovelSchema]
            junshi: List[NovelSchema]
        categoryRecommend: CategoryRecommendData = SchemaValue(None)
        hotRecommends: List[NovelSchema] = SchemaValue(None)
        guessRecommends: List[NovelSchema] = SchemaValue(None)
        banners: List[str] = SchemaValue(None)
    data: HomeInfoData
