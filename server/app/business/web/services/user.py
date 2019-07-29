from .base import BaseService


class UserService(BaseService):
    def get_base_columns(self):
        return [self.table.c.id, self.table.c.email]

    def auth_user_by_email(self, email):
        return self.get_one(
            {"where": (self.table.c.email == email,), "fields": self.get_base_columns()}
        )

    def auth_user_by_email_password(self, email, password):
        return self.get_one(
            {
                "where": (
                    self.table.c.email == email,
                    self.table.c.password == password,
                ),
                "fields": self.get_base_columns(),
            }
        )
