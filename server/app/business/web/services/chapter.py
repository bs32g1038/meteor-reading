from .base import BaseService


class ChapterService(BaseService):

    def get_base_columns(self):
        return [
            self.table.c.id,
            self.table.c.title,
            self.table.c.created_at,
            self.table.c.novel_id
        ]

    def get_chapters_by_novel_id(self, novel_id=-1, offset=0, limit=10):
        return self.get_all({
            'where': (self.table.c.novel_id == novel_id,),
            'offset': offset,
            'limit': 20000,
            'fields': self.get_base_columns(),
            'order_by': (self.table.c.id.desc(),)
        })

    def get_start_chapter(self, novel_id):
        return self.get_one({
            'where': (self.table.c.novel_id == novel_id,),
            'fields': self.get_base_columns(),
            'order_by': (self.table.c.index.asc(),)
        })

    def get_last_chapter(self, novel_id):
        return self.get_one({
            'where': (self.table.c.novel_id == novel_id,),
            'fields': self.get_base_columns(),
            'order_by': (self.table.c.index.desc(),)
        })

    def get_pre_chapter(self, novel_id, chapter_index):
        return self.get_one({
            'where': (self.table.c.novel_id == novel_id, self.table.c.index < chapter_index),
            'fields': self.get_base_columns(),
            'order_by': (self.table.c.index.desc(),)
        })

    def get_next_chapter(self, novel_id, chapter_index):
        return self.get_one({
            'where': (self.table.c.novel_id == novel_id, self.table.c.index > chapter_index),
            'fields': self.get_base_columns(),
            'order_by': (self.table.c.index.asc(),)
        })

    def get_catalog(self, novel_id):
        return self.get_all({
            'where': (self.table.c.novel_id == novel_id,),
            'limit': 20000,
            'fields': self.get_base_columns(),
            'order_by': (self.table.c.index.desc(),)
        })
