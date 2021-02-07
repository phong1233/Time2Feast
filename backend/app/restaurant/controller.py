from flask import Blueprint, request
from app.shared.decorators import return_json, token_required, restaurant_required
from app.restaurant.service import Service as RestoService

resto_service = RestoService()

resto_routes = Blueprint('resto_routes', __name__)

@resto_routes.route('/', methods=['POST'])
@restaurant_required
@return_json
def update_restaurant_menu(user):
    data = request.get_json()
    return resto_service.update_menu(user['rname'], data)

@resto_routes.route('/<name>', methods=['GET'])
@return_json
def get_restaurant_menu(name):
    return resto_service.get_restaurant_menu(name)

@resto_routes.route('/list', methods=['GET'])
@return_json
def get_all_restaurant_name():
    return resto_service.get_all_restaurant_name()
