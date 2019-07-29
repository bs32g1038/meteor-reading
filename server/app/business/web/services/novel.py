from .base import BaseService
from sqlalchemy.sql import func


class NovelService(BaseService):

    def get_base_columns(self):
        return [
            self.table.c.id,
            self.table.c.author,
            self.table.c.name,
            self.table.c.tag_id,
            self.table.c.summary,
            self.table.c.sum_words,
            self.table.c.updated_at,
            self.table.c.pic,
            self.table.c.status,
            self.table.c.created_at
        ]

    def get_novels_by_tag_id(self, tagId=0, offset=0, limit=10):
        return self.get_all({
            'where': (self.table.c.tag_id == tagId,),
            'offset': offset,
            'limit': limit,
            'fields': self.get_base_columns()
        })

    def get_novels(self, offset=0, limit=10):
        return self.get_all({
            'offset': offset,
            'limit': limit,
            'fields': self.get_base_columns()
        })

    def get_novels_order_by_updated_at(self, offset=0, limit=10, DESC=True):
        return self.get_all({
            'offset': offset,
            'limit': limit,
            'fields': self.get_base_columns(),
            'order_by': ((self.table.c.updated_at.desc() if DESC else self.table.c.updated_at.asc()),)
        })

    def get_brief_novels(self, offset=0, limit=10):
        return self.get_all({
            'offset': offset,
            'limit': limit,
            'fields': [
                self.table.c.id,
                self.table.c.author,
                self.table.c.name,
                self.table.c.pic
            ],
            'order_by': (self.table.c.fingerprint.desc(),)
        })

    def get_random_novels(self):
        return self.get_all({
            'limit': 10,
            'fields': [self.table.c.id, self.table.c.name],
            'order_by': (func.random(),)
        })

    def get_search_result(self, kw):
        return self.get_all({
            'where': (self.table.c.name.like('%' + kw + '%'),),
            'limit': 30,
            'fields': self.get_base_columns()
        })
