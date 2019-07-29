import databases
from starlette.config import Config
import os


# Configuration from environment variables or '.env' file.
config = Config('.env')
DATABASE_URL = config('DATABASE_URL')

database = databases.Database(os.getenv("DB", DATABASE_URL), min_size=5, max_size=20)
