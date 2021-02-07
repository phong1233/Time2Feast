#pylint: disable=arguments-differ, no-member
import datetime
import mongoengine
from app.shared.mongo_helper import mongo_to_dict

class Item(mongoengine.EmbeddedDocument):
    name = mongoengine.StringField(required=True)
    price = mongoengine.FloatField(required=True)
    quantity = mongoengine.IntField(required=True)

class Orders(mongoengine.EmbeddedDocument):
    customer = mongoengine.StringField(required=True)
    total = mongoengine.FloatField(required=True)
    items = mongoengine.EmbeddedDocumentListField(Item, default=[])
    address = mongoengine.StringField(required=True)


class Order(mongoengine.DynamicDocument):
    rname = mongoengine.StringField(required=True)
    orders = mongoengine.EmbeddedDocumentListField(Orders, default=[])
    end = mongoengine.StringField(required=True)
    shipping = mongoengine.FloatField(required=True)
    ogshipping = mongoengine.FloatField(required=True)
    maxOrder = mongoengine.IntField(required=True)
    lastUpdate = mongoengine.DateTimeField(default=datetime.datetime.utcnow())
    meta = {
        'auto_create_index': False,
        'index_background': True,
        'indexes': [
            'rname',
            'end'
        ],
        'collection': 'orders'
    }

    def save(self, *args, **kwargs):
        self.lastUpdate = datetime.datetime.utcnow()
        return super(Order, self).save(*args, **kwargs)

    @staticmethod
    def get_all_restaurant_orders(rname):
        existing = Order.objects(rname=rname)
        all_orders = []
        for i in existing:
            all_orders.append(i.to_dict())
        return all_orders

    @staticmethod
    def get_restaurant_order(rname, end):
        existing = Order.objects(rname=rname, end=end).first()
        if not existing:
            return None
        return existing

    def to_dict(self):
        return mongo_to_dict(self, [])
