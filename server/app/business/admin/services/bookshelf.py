from sqlalchemy.sql import alias, join, outerjoin, select

from app.tables import bookshelfs, chapters, novels, users
from app.utils.helper import parse_time

from .base import BaseService


class BookshelfService(BaseService):
    def is_have_record(self, novel_id, user_id):
        return self.get_one(
            {
                "where": (
                    self.table.c.novel_id == novel_id,
                    self.table.c.user_id == user_id,
                )
            }
        )

    """
    难度：多表查询
    功能：关联小说表，用户表，章节表（获取最后的章节，基于小说模型中的last_chapter_id）
    方法：sql 拼接实现
    结果：组合结果字段返回
    """

    async def get_bookshelf_record(self, user_id):
        lastChapter = select(
            [
                chapters.c.id.label("chapter_id"),
                chapters.c.title.label("chapter_title"),
                chapters.c.created_at.label("chapter_created_at"),
                chapters.c.novel_id,
            ]
        ).where(chapters.c.id == novels.c.last_chapter_id)

        lc = alias(lastChapter, name="lc")

        b1 = (
            select([bookshelfs])
            .select_from(join(users, bookshelfs, bookshelfs.c.user_id == user_id))
            .distinct()
        )

        b1 = alias(b1, name="b1")

        n1 = select([novels]).select_from(
            join(b1, novels, b1.c.novel_id == novels.c.id)
        )

        n2 = alias(n1, name="n2")

        query = (
            select([n2, lc])
            .select_from(outerjoin(n2, lc, n2.c.id == lc.c.novel_id))
            .distinct()
        )

        rows = await self.get_database().fetch_all(query)

        results = []

        for row in rows:
            tmp = {
                "author": row["author"],
                "id": row["id"],
                "name": row["name"],
                "pic": row["pic"],
                "status": row["status"],
                "tagId": row["tag_id"],
            }
            if row["chapter_id"]:
                tmp["lastChapter"] = {
                    "created_at": parse_time(row["chapter_created_at"]),
                    "id": row["chapter_id"],
                    "title": row["chapter_title"],
                }
            results.append(tmp)

        return results
