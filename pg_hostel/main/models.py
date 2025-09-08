from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('owner', 'Owner'),
        ('user', 'User'),
    )
    email = models.EmailField(unique=True)   # ✅ makes email unique
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=20, choices=[("owner", "Owner"), ("user", "User")])
    phone = models.CharField(max_length=15, blank=True, null=True)
    business_name = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"

