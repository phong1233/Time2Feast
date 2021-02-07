
from flask import Flask
from flask_cors import CORS
from app.shared.mongo_setup import db_connection
from app.user.controller import user_routes
from app.restaurant.controller import resto_routes
from app.order.controller import order_routes


def create_app(application_name: str):
    app = Flask(application_name, instance_relative_config=False)

    CORS(app)

    app.url_map.strict_slashes = False

    app.register_blueprint(user_routes, url_prefix='/user')
    app.register_blueprint(resto_routes, url_prefix='/resto')
    app.register_blueprint(order_routes, url_prefix='/order')

    @app.route('/')
    def root():
        return 'backend is running'

    root()
    return app
