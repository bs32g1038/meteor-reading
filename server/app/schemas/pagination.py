from pydantic import BaseModel, Schema


class Pagination(BaseModel):
    page: int = Schema(1, ge=1, le=100, title="page必须在1-100之间！")
    limit: int = Schema(10, ge=1, le=100, title="limit必须在1-100之间！")


class StandardPagination(BaseModel):
    page: int = Schema(1, ge=1, le=100, title="page必须在1-1000之间！")
    limit: int = Schema(10, ge=1, le=1000, title="limit必须在1-10000之间！")


class LargePagination(BaseModel):
    page: int = Schema(1, ge=1, le=1000, title="page必须在1-1000之间！")
    limit: int = Schema(10, ge=1, le=10000, title="limit必须在1-10000之间！")
