import datetime
from config import config
from app.order.model import Order, Orders, Item

class Service:
    def persist_order_to_mongo(self, order):
        try:
            order.save()
            return True
        except RuntimeError:
            return False

    def create_order_slot(self, rname, end, max_order, shipping):
        order = Order.get_restaurant_order(rname=rname, end=end)
        if order:
            return {
                'status': 400,
                'message': 'order already exist'
            }

        new_order = Order(
            rname=rname,
            end=end,
            maxOrder=max_order,
            shipping=shipping,
            ogshipping=shipping
        )
        if self.persist_order_to_mongo(new_order):
            return  {
                'status': 200,
                'message': 'order created'
            }
        return {
            'status': 500,
            'message': 'order not created'
        }

    def get_all_restaurant_orders(self, rname):
        order = Order.get_all_restaurant_orders(rname=rname)
        return {
            'status': 200,
            'message': order
        }

    def delete_order(self, rname, end):
        order = Order.get_restaurant_order(rname=rname, end=end)
        if not order:
            return {
                'status': 404,
                'message': 'order does not exist'
            }
        order.delete()
        return {
            'status': 200,
            'message': 'order deleted exist'
        }

    def add_item_to_order(self, rname, end, customer, items, address):
        order = Order.get_restaurant_order(rname=rname, end=end)
        if not order:
            return {
                'status': 404,
                'message': 'order does not exist'
            }
        order_dict = order.to_dict()
        if len(order_dict['orders']) >= order_dict['maxOrder']:
            return {
                'status': 409,
                'message': 'max order reached'
            }
        
        total = 0
        for i in items:
            total += i['price'] * i['quantity']
        temp_orders = Orders(
            customer=customer,
            address = address,
            total=total
        )

        for i in items:
            temp_items = Item(
                name = i['name'],
                price = i['price'],
                quantity = i['quantity']
            )
            temp_orders.items.append(temp_items)

        order.orders.append(temp_orders)
        order.shipping = order.ogshipping / (len(order_dict['orders']) + 1)
        order.save()

        return {
            'status': 200,
            'message': 'order added'
        }
