from django.shortcuts import render

# Create your views here.
def main(request):
    return render(request,'main.html')

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