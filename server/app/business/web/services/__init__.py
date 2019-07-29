from app import tables

from .chapter import ChapterService
from .novel import NovelService
from .user import UserService
from .bookshelf import BookshelfService


chapter = ChapterService(tables.chapters)
novel = NovelService(tables.novels)
user = UserService(tables.users)
bookshelf = BookshelfService(tables.bookshelfs)
