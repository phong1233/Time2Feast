import os

defaults = {
    'app_name': os.getenv('APP_NAME', 'time2feast'),
    'debug': os.getenv('DEBUG', 'True'),
    'host': os.getenv('HOST', '0.0.0.0'),
    'secret_key': os.getenv('SECRET_KEY', 'Super Secret Key 2000'),
    'database': {
        'uri': os.getenv('MONGO_URI', None),
        'name': os.getenv('MONGO_NAME', 'time2feast-cluster'),
        'mongo-default': {
            'host': os.getenv('MONGO_HOST', 'mongodb'),
            'port': int(os.getenv('MONGO_PORT', '27017')),
            'username': os.getenv('MONGO_USER', ''),
            'password': os.getenv('MONGO_PASS', '')
        }
    },
    'token': {
        'exp': int(os.getenv('TOKEN_EXP', '10'))
    }
}

config = defaults