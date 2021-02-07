#pylint: disable=bare-except, broad-except

import functools
import jwt
from flask import jsonify, request
from config import config

def convert_to_json(string):
    return jsonify(string)

def return_json(f):
    @functools.wraps(f)
    def to_json(*a, **k):
        return convert_to_json(f(*a, **k))
    return to_json

def token_required(f):
    @functools.wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return {
                'status': 409,
                'message': 'Missing token'
            }
        data = jwt.decode(token, config['secret_key'])
        user = data['user']
        return f(user, *args, **kwargs)
    return decorated

def restaurant_required(f):
    @functools.wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return {
                'status': 409,
                'message': 'Missing token'
            }
        data = jwt.decode(token, config['secret_key'])
        user = data['user']
        if user['role'] != 'owner':
            return {
                'status': 409,
                'message': 'User is not an admin'
            }

        return f(user, *args, **kwargs)

    return decorated