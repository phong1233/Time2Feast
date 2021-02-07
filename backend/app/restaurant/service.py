import datetime
from config import config
from app.restaurant.model import Restaurant, Menu

class Service:

    def persist_resto_to_mongo(self, resto):
        try:
            resto.save()
            return True
        except RuntimeError:
            return False

    def create_new_restaurant(self, rname, owner, address):
        resto = Restaurant.get_restaurant_by_name(rname=rname)
        if resto:
            return {
                'status': 400,
                'message': 'resto already exist'
            }
        new_resto = Restaurant(
            rname=rname,
            owner=owner,
            address=address
        )
        if self.persist_resto_to_mongo(new_resto):
            return  {
                'status': 200,
                'message': 'Resto created'
            }
        return {
            'status': 500,
            'message': 'Resto not created'
        }

    def update_menu(self, rname, menu):
        resto = Restaurant.get_restaurant_by_name(rname=rname)
        if not resto:
            return {
                'status': 404,
                'message': 'resto does not exist'
            }
        try:
            for i in menu:
                temp = Menu(
                    price=i['price'],
                    name=i['name']
                )
                resto.items.append(temp)
            resto.save()
            return {
                'status': 200,
                'message': 'Resto updated'
            }
        except RuntimeError:
            return {
                'status': 500,
                'message': 'Resto not updated'
            }        

    def get_restaurant_menu(self, rname):
        resto = Restaurant.get_restaurant_by_name(rname=rname)
        if not resto:
            return {
                'status': 404,
                'message': 'resto does not exist'
            }
        dic = resto.to_dict()
        return {
            'status': 200,
            'message': dic['items']
        }

    def get_all_restaurant_name(self):
        resto = Restaurant.get_all_restaurant()
        all_resto = []
        for i in resto:
            temp = {
                'rname': i['rname'],
                'address': i['address'],
                'owner': i['owner']
            }
            all_resto.append(temp)
        return {
            'status': 200,
            'message': resto
        }
