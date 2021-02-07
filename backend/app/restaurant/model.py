#pylint: disable=arguments-differ, no-member
import datetime
import mongoengine
from app.shared.mongo_helper import mongo_to_dict

class Menu(mongoengine.EmbeddedDocument):
    name = mongoengine.StringField(required=True)
    price = mongoengine.FloatField(required=True)

class Restaurant(mongoengine.DynamicDocument):
    rname = mongoengine.StringField(required=True)
    owner = mongoengine.StringField(required=True, unique=True)
    address = mongoengine.StringField(required=True)
    items = mongoengine.EmbeddedDocumentListField(Menu, default= [])
    lastUpdate = mongoengine.DateTimeField(default=datetime.datetime.utcnow())
    meta = {
        'auto_create_index': False,
        'index_background': True,
        'indexes': [
            'rname'
        ],
        'collection': 'restaurants'
    }

    def save(self, *args, **kwargs):
        self.lastUpdate = datetime.datetime.utcnow()
        return super(Restaurant, self).save(*args, **kwargs)

    @staticmethod
    def get_restaurant_by_name(rname):
        existing = Restaurant.objects(rname=rname).first()
        return existing

    @staticmethod
    def get_all_restaurant():
        existing = Restaurant.objects()
        resto = []
        for r in existing:
            resto.append(r.to_dict())
        return resto

    def to_dict(self):
        return mongo_to_dict(self, [])
