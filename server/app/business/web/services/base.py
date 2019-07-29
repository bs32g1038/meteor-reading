from app.database.db import database
from sqlalchemy.sql import select, func, alias


class BaseQuery:
    def __init__(self, table):
        self._query = select([table])

    def set_columns(self, columns: list = None):
        if columns:
            self._query = select(columns)
        return self

    def set_where(self, where: tuple = None):
        self._query = self.generate_where(self._query, where)
        return self

    @staticmethod
    def generate_where(query, where: tuple = None):
        if where:
            for w in where:
                query = query.where(w)
        return query

    def set_offset(self, offset: int = 0):
        if offset:
            self._query = self._query.offset(offset)
        return self

    def set_limit(self, limit: int = 0):
        if limit:
            self._query = self._query.limit(limit)
        return self

    def set_order_by(self, order_by: tuple = None):
        if order_by:
            self._query = self._query.order_by(*order_by)
        return self

    def get_query(
        self,
        columns: list = None,
        where: tuple = None,
        offset: int = 0,
        limit: int = 0,
        order_by: tuple = None,
    ):
        self.set_columns(columns).set_where(where).set_offset(offset).set_limit(
            limit
        ).set_order_by(order_by)
        return self._query


class BaseService:
    def __init__(self, table):
        self.__table = table
        self.database = database

    @property
    def table(self):
        return self.__table

    def get_all(self, option):
        where = option.get("where", None)
        offset = option.get("offset", None)
        limit = option.get("limit", None)
        columns = option.get("fields", None)
        order_by = option.get("order_by", None)
        return self.database.fetch_all(
            BaseQuery(self.table).get_query(
                columns=columns,
                where=where,
                offset=offset,
                limit=limit,
                order_by=order_by,
            )
        )

    def get_one(self, option):
        where = option.get("where", None)
        columns = option.get("fields", None)
        order_by = option.get("order_by", None)
        return self.database.fetch_one(
            BaseQuery(self.table).get_query(
                columns=columns, where=where, limit=1, order_by=order_by
            )
        )

    def get_by_id(self, id, columns=None):
        return self.get_one({"where": (self.table.c.id == id,), "fields": columns})

    def insert(self, **values):
        query = self.table.insert().values(values)
        return self.database.execute(query)

    def delete(self, where):
        query = BaseQuery.generate_where(self.table.delete(), where)
        return self.database.execute(query)

    def delete_by_id(self, id):
        return self.delete((self.table.c.id == id,))

    def get_database(self):
        return self.database

    def count(self, where=None, limit=0):
        if limit == 0:
            query = BaseQuery(self.table).get_query(
                columns=[func.count(self.table.c.id).label("count")], where=where
            )
        else:
            t1 = BaseQuery(self.table).get_query(
                columns=[self.table.c.id], where=where, limit=limit
            )
            t1 = alias(t1, name="t1")
            query = select([func.count(t1.c.id).label("count")]).select_from(t1)
        return database.fetch_one(query)
