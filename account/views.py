from account.forms import SignupForm
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect, render
from django.contrib.auth.forms import AuthenticationForm
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
User = get_user_model()
from .forms import SignupForm


# Create your views here.

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(request=request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request=request, username=username, password=password)
            if user is not None:
                login(request, user)
        return redirect('main')
    else:
        form = AuthenticationForm()
        return render(request, 'login.html', {'form':form})

def logout_view(request):
    logout(request)
    return redirect('main')


def signup_view(request):
    if request.method == "POST":
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
        return redirect('main')
    else:
        form = SignupForm()
        return render(request,'signup.html',{'form':form})

