from datetime import datetime, timedelta, timezone

from app.utils.reponse import return_ok
from fastapi import APIRouter
from starlette.requests import Request

from .. import services
from ..models.forms.user import LoginFormModel, RegisterFormModel
from ..models.responses.user import LoginResponseModel, RegisterResponseModel

router = APIRouter()

TAG = "用户"


@router.post(
    "/v1/api/register", summary="用户注册", response_model=RegisterResponseModel, tags=[TAG]
)
async def register(*, user: RegisterFormModel):
    email = user.email
    password = user.password

    user = await services.user.auth_user_by_email(email)
    if user:
        return return_ok(None, message="该账号已经存在！", code=20001)

    id = await services.user.insert(
        account=email,
        email=email,
        password=password,
        avatar="",
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )

    return return_ok({"id": id})


@router.post(
    "/v1/api/login", summary="用户登录", response_model=LoginResponseModel, tags=[TAG]
)
async def login(request: Request, user: LoginFormModel):
    user = await services.user.auth_user_by_email_password(
        email=user.email, password=user.password
    )
    if not user:
        return return_ok(None, message="该账号不存在！", code=20004)
    request.session["user"] = user["id"]

    now_time = datetime.now(timezone.utc)

    return return_ok({"id": user["id"], "expire": now_time + timedelta(hours=+2)})
