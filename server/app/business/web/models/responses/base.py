from app.schemas.response import ResponseBaseSchema
from app.schemas.base import SchemaValue


class BaseResponseModel(ResponseBaseSchema):
    data: dict = SchemaValue(None)
