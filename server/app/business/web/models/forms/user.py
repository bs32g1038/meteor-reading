from app.schemas.user import UserInSchema, UserEmailSchema, UserPasswordSchema


class RegisterFormModel(UserInSchema):
    pass


class LoginFormModel(UserEmailSchema, UserPasswordSchema):
    pass
