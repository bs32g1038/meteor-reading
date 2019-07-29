from pydantic import BaseModel


class ResponseBaseSchema(BaseModel):
    code: int
    message: str
