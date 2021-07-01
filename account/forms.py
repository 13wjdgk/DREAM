from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

class SignupForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ['username', 'password','name', 'birth_year', 'birth_month', 
        'birth_day', 'email_id', 'email_back', 
        'phone_one', 'phone_two', 'phone_three']