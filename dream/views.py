
from django.shortcuts import render

# Create your views here.
def main(request):
    return render(request,'main.html')


def login_view(request):
    return render(request, 'login.html')
def signup(request):
    return render(request,'signup.html')
def Info(request):
    return render(request,'Info.html')
def payment(request):
    return render(request,'payment.html')

