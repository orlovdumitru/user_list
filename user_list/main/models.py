from django.db import models


STATUS = [
    ('active', 'Active'),
    ('inactive', 'Inactive'),
    ('deleted', 'Deleted')
]
class User(models.Model):
    userName = models.CharField(max_length=64, unique=True)
    firstName = models.CharField(max_length=64)
    lastName = models.CharField(max_length=64)
    email = models.EmailField(max_length=254)
    status = models.CharField(max_length=16, choices=STATUS, default='inactive')
    created_at = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            'id': self.id,
            'userName': self.userName,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'email': self.email,
            'status': self.status,
        }
