from flask import Blueprint, request
from app.shared.decorators import return_json, token_required, restaurant_required
from app.user.service import Service as UserService

user_service = UserService()

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/login', methods=['POST'])
@return_json
def login_user():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return {
            'status': 409,
            'message': 'Missing Auth'
        }
    return user_service.login_user(auth['username'], auth['password'])

@user_routes.route('/login', methods=['GET'])
@return_json
@token_required
def login_using_token(user):
    return user_service.update_token(user)

@user_routes.route('/create', methods=['POST'])
@return_json
def create_new_user():
    data = request.get_json()
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return {
            'status': 409,
            'message': 'Missing Auth'
        }
    return user_service.create_new_user(auth['username'], auth['password'], data)

@user_routes.route('/current', methods=['GET'])
@return_json
@token_required
def get_current_user(current_user):
    return {
        'status': 200,
        'message': current_user
    }
