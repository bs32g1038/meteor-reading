from schemas.response import ResponseBaseSchema
from schemas.base import SchemaValue


class BaseResponseModel(ResponseBaseSchema):
    data: dict = SchemaValue(None)
