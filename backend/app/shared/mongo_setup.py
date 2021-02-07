from mongoengine import connect, register_connection
from config import config

mongo_config = config['database']

db_connection = connect(
    mongo_config['name'],
    'default',
    **mongo_config['mongo-default']
) if not mongo_config['uri'] else register_connection(alias='default', host=mongo_config['uri'])
