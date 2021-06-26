from django.shortcuts import render

# Create your views here.
def Info(request):
    return render(request,'Info.html')

def main(request):
    return render(request,'main.html')