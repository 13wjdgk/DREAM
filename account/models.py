from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    name = models.CharField(max_length=30)
    birth_year = models.CharField(max_length=10)
    birth_month = models.CharField(max_length=10)
    birth_day = models.CharField(max_length=10)
    email_id = models.CharField(max_length=50)
    email_back = models.CharField(max_length=50)
    phone_one = models.CharField(max_length=10)
    phone_two = models.CharField(max_length=10)
    phone_three = models.CharField(max_length=10)
