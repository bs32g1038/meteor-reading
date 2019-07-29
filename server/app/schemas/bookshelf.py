from app.schemas.base import BaseSchema, SchemaValue


class BookshelfIdSchema(BaseSchema):
    id: int = SchemaValue(None, title="书架id")
