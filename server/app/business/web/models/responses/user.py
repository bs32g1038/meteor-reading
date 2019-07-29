from app.schemas.user import UserIdSchema, ExpireSchema
from app.schemas.response import ResponseBaseSchema


class RegisterResponseModel(ResponseBaseSchema):
    class RegisterResponseData(UserIdSchema):
        pass
    data: RegisterResponseData


class LoginResponseModel(ResponseBaseSchema):
    class LoginResponseData(ExpireSchema, UserIdSchema):
        pass
    data: LoginResponseData = None
