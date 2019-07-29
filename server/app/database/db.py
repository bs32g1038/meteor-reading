import databases
from starlette.config import Config


# Configuration from environment variables or '.env' file.
config = Config('.env')
DATABASE_URL = config('DATABASE_URL')

database = databases.Database(DATABASE_URL, min_size=5, max_size=20)
