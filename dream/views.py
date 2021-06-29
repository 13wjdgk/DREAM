
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

def receipt(request):
    return render(request,'receipt.html')

def point(request):
    return render(request,'point.html')

def notifyhome(request):
    return render(request,'notifyhome.html')

def notify(request):
    return render(request,'notify.html')

def notifycom(request):
    return render(request,"notifycom.html")

def ask(request):
    return render(request,"ask.html")

