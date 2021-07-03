from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.forms import widgets
from .models import CustomUser

class SignupForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ['username', 'name', 'birth' ,'email',
        'phone' ,'password']

        widgets = {
            'username' : forms.TextInput(attrs={'class': 'form-control', 'placeholder':'아이디를 입력하세요.', 'style':'width: 300px'}),
            'password' : forms.PasswordInput(attrs={'class': 'form-control', 'placeholder':'비밀번호를 입력하세요.', 'style':'width: 300px'}),
            'name' : forms.TextInput(attrs={'class': 'form-control', 'placeholder':'이름', 'style':'width: 300px'}),
            'email' : forms.EmailInput(attrs={'class': 'form-control', 'placeholder':'이메일을 입력하세요.', 'style':'width: 100x'}),
            'birth' : forms.DateInput(attrs={'class': 'form-control', 'placeholder':'yyyy-mm-dd', 'style':'width: 200px'}),
            'phone' : forms.TextInput(attrs={'class': 'form-control', 'placeholder':'전화번호를 입력하세요.', 'style':'width: 200px'}),
        }
