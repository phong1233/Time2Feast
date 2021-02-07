from flask import Blueprint, request
from app.shared.decorators import return_json, token_required, restaurant_required
from app.order.service import Service as OrderService

order_service = OrderService()

order_routes = Blueprint('order_routes', __name__)

@order_routes.route('/', methods=['POST'])
@restaurant_required
@return_json
def create_new_restaurant_order(user):
    data = request.get_json()
    return order_service.create_order_slot(user['rname'], data['end'], data['maxOrder'], data['shipping'])

@order_routes.route('/', methods=['DELETE'])
@restaurant_required
@return_json
def delete_restaurant_order(user):
    data = request.get_json()
    return order_service.delete_order(user['rname'], data['end'])

@order_routes.route('/<name>', methods=['GET'])
@token_required
@return_json
def get_all_restaurant_order(user, name):
    return order_service.get_all_restaurant_orders(name)

@order_routes.route('/new', methods=['POST'])
@token_required
@return_json
def add_item_to_restaurant_order(user):
    data = request.get_json()
    return order_service.add_item_to_order(data['rname'], data['end'], user['email'], data['items'], user['address'])

