#pylint: disable=arguments-differ, no-member
import datetime
import mongoengine

class User(mongoengine.DynamicDocument):
    fname = mongoengine.StringField(required=True)
    lname = mongoengine.StringField(required=True)
    email = mongoengine.StringField(required=True, unique=True)
    password = mongoengine.StringField(required=True)
    rname = mongoengine.StringField(required=False)
    address = mongoengine.StringField(required=True)
    lastUpdate = mongoengine.DateTimeField(default=datetime.datetime.utcnow())
    meta = {
        'auto_create_index': False,
        'index_background': True,
        'indexes': [
            'email'
        ],
        'collection': 'users'
    }

    def save(self, *args, **kwargs):
        self.lastUpdate = datetime.datetime.utcnow()
        return super(User, self).save(*args, **kwargs)

    @staticmethod
    def get_user_from_email(email):
        existing = User.objects(email=email).first()
        return existing

    def to_dict(self):
        return self.to_mongo().to_dict()
