import sqlalchemy

# Database table definitions.
metadata = sqlalchemy.MetaData()

bookshelfs = sqlalchemy.Table(
    "bookshelf",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("novel_id", sqlalchemy.Integer),
    sqlalchemy.Column("user_id", sqlalchemy.Integer),
    sqlalchemy.Column("created_at", sqlalchemy.DateTime),
    sqlalchemy.Column("updated_at", sqlalchemy.DateTime)
)
