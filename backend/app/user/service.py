import datetime
import jwt
from config import config
from werkzeug.security import generate_password_hash, check_password_hash
from app.user.model import User
from app.restaurant.service import Service as RestoService

class Service:
    resto_service = None

    def __init__(self, resto=None):
        self.resto_service = RestoService() if not resto else resto

    def parse_user_sensitive_data(self, user):
        return {
            'fname': user['fname'] if 'fname' in user else None,
            'lname': user['lname'] if 'lname' in user else None,
            'email': user['email'] if 'email' in user else None,
            'address': user['address'] if 'address' in user else None,
            'rname': user['rname'] if 'rname' in user else None,
            'role': 'owner' if 'rname' in user else 'client'
        }

    def persist_user_to_mongo(self, user):
        try:
            user.save()
            return True
        except RuntimeError:
            return False

    def delete_user_from_mongo(self, user):
        try:
            user.delete()
            return True
        except RuntimeError:
            return False

    def create_new_user(self, email, password, data):
        user = User.get_user_from_email(email=email)
        if user:
            return {
                'status': 400,
                'message': 'User already exist'
            }

        if 'rname' in data:
            res = self.resto_service.create_new_restaurant(data['rname'], email, data['address'])
            if res['status'] != 200:
                return res

        hashed_password = generate_password_hash(password, method='sha256')
        new_user = User(
            fname=data['fname'],
            lname=data['lname'],
            email=email,
            password=hashed_password,
            address=data['address'],
            rname=data['rname'] if 'rname' in data else None
        )
        if self.persist_user_to_mongo(new_user):
            return  {
                'status': 200,
                'message': 'User created'
            }
        return {
            'status': 500,
            'message': 'User not created'
        }

    def get_current_user_info(self, current_user):
        user = current_user if type(current_user).__name__ == 'dict' else current_user.to_dict()
        parsed_user = self.parse_user_sensitive_data(user)
        return parsed_user

    def login_user(self, email, password):
        user = User.get_user_from_email(email=email)
        if not user:
            return {
                'status': 404,
                'message': 'User not found'
            }
        if check_password_hash(user['password'], password):
            token = jwt.encode(
                {
                    'user': self.parse_user_sensitive_data(user.to_dict()),
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=config['token']['exp'])
                },
                config['secret_key']
            )
            return {
                'status': 200,
                'message': token.decode('UTF-8')
            }
        return {
            'status': 409,
            'message': 'invalid password'
        }

    def update_token(self, user):
        token = jwt.encode(
            {
                'user': user,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=config['token']['exp'])
            },
            config['secret_key']
        )
        return {
            'status': 200,
            'message': token.decode('UTF-8')
        }
