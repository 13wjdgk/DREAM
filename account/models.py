from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    name = models.CharField(max_length=30)
    birth = models.CharField(max_length=50, default='')
    email = models.EmailField(max_length=250)
    phone = models.CharField(max_length=250, default='')

