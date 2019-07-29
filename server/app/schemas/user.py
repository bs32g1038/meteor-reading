from datetime import datetime

from app.schemas.base import BaseSchema, SchemaValue


class UserIdSchema(BaseSchema):
    id: int = SchemaValue(None, title="用户id")


class UserNicknameSchema(BaseSchema):
    nickname: str = SchemaValue(None, title="用户昵称")


class UserPasswordSchema(BaseSchema):
    password: str = SchemaValue(None, title="用户密码")


class UserEmailSchema(BaseSchema):
    email: str = SchemaValue(None, title="用户email")


class UserAccountSchema(BaseSchema):
    account: str = SchemaValue(None, title="用户账号")


class UserAvatarSchema(BaseSchema):
    avatar: str = SchemaValue(None, title="用户头像")


class UserCreatedAtSchema(BaseSchema):
    created_at: datetime = SchemaValue(None, title="创建时间", alias="createdAt")


class UserUpdatedAtSchema(BaseSchema):
    updated_at: datetime = SchemaValue(None, title="更新时间", alias="updatedAt")


class ExpireSchema(BaseSchema):
    expire: datetime = SchemaValue(None, title="登录有效时间")


class UserInSchema(BaseSchema):
    id: int = SchemaValue(None, title="用户id")
    nickname: str = SchemaValue(None, title="用户昵称")
    password: str = SchemaValue(None, title="用户密码")
    email: str = SchemaValue(None, title="用户email")
    account: str = SchemaValue(None, title="用户账号")
    avatar: str = SchemaValue(None, title="用户头像")
    created_at: datetime = SchemaValue(None, title="创建时间", alias="createdAt")
    updated_at: datetime = SchemaValue(None, title="更新时间", alias="updatedAt")
