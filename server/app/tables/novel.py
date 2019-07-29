import sqlalchemy

# Database table definitions.
metadata = sqlalchemy.MetaData()

novels = sqlalchemy.Table(
    "crawler_novels",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String),
    sqlalchemy.Column("pic", sqlalchemy.String),
    sqlalchemy.Column("summary", sqlalchemy.Text),
    sqlalchemy.Column("author", sqlalchemy.String),
    sqlalchemy.Column("tag_id", sqlalchemy.Integer),
    sqlalchemy.Column("sum_words", sqlalchemy.Integer),
    sqlalchemy.Column("status", sqlalchemy.Boolean),
    sqlalchemy.Column("created_at", sqlalchemy.DateTime),
    sqlalchemy.Column("updated_at", sqlalchemy.DateTime),
    sqlalchemy.Column("fingerprint", sqlalchemy.String),
    sqlalchemy.Column("is_deleted", sqlalchemy.Boolean),
    sqlalchemy.Column("last_chapter_id", sqlalchemy.Integer)
)
