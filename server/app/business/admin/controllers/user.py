from fastapi import APIRouter

from app.utils.reponse import return_ok

router = APIRouter()


@router.get("/v1/admin-api/user/info")
async def getRegisterInfo():
    return return_ok(
        {
            "roles": ["admin"],
            "introduction": "I am a super administrator",
            "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
            "name": "Super Admin",
        }
    )
