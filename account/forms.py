from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.forms import widgets
from .models import CustomUser

class SignupForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'passwordCheck', 'name', 'birth_year', 'birth_month', 
        'birth_day', 'email_id', 'email_back', 
        'phone_one', 'phone_two', 'phone_three']

        widgets = {
            'username' : forms.TextInput(attrs={'class': 'form-control', 'placeholder':'아이디를 입력하세요.', 'style':'width: 300px'}),
            'password' : forms.TextInput(attrs={'class': 'form-control', 'placeholder':'비밀번호를 입력하세요.', 'style':'width: 300px'}),
            'passwordCheck' : forms.TextInput(attrs={'class': 'form-control', 'placeholder':'비밀번호를 입력하세요.', 'style':'width: 300px'}),
        }