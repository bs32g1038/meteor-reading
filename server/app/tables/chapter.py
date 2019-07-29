import sqlalchemy

# Database table definitions.
metadata = sqlalchemy.MetaData()

chapters = sqlalchemy.Table(
    "crawler_chapters",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("title", sqlalchemy.String),
    sqlalchemy.Column("content", sqlalchemy.Text),
    sqlalchemy.Column("index", sqlalchemy.Integer),
    sqlalchemy.Column("sum_words", sqlalchemy.Integer),
    sqlalchemy.Column("novel_id", sqlalchemy.Integer),
    sqlalchemy.Column("created_at", sqlalchemy.DateTime),
    sqlalchemy.Column("updated_at", sqlalchemy.DateTime),
    sqlalchemy.Column("fingerprint", sqlalchemy.String)
)
