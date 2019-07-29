import sqlalchemy

# Database table definitions.
metadata = sqlalchemy.MetaData()

users = sqlalchemy.Table(
    "user",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("nickname", sqlalchemy.String),
    sqlalchemy.Column("account", sqlalchemy.String),
    sqlalchemy.Column("email", sqlalchemy.String),
    sqlalchemy.Column("password", sqlalchemy.String),
    sqlalchemy.Column("avatar", sqlalchemy.String),
    sqlalchemy.Column("created_at", sqlalchemy.DateTime),
    sqlalchemy.Column("updated_at", sqlalchemy.DateTime)
)