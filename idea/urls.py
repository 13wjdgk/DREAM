
"""idea URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import dream.views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',dream.views.main,name='main'),
    path('login/', dream.views.login_view, name='login'),
    path('signup/',dream.views.signup,name='signup'),
    path('Info/',dream.views.Info,name='Info'),
    path('payment/',dream.views.payment,name='payment'),
    path('point/',dream.views.point,name='point'),
    path('notifyhome/',dream.views.notifyhome,name="notifyhome"),
    path('notify/',dream.views.notify,name="notify"),
    path('notifycom/',dream.views.notifycom,name="notifycom"),
    path('ask/',dream.views.ask,name="ask"),
    path('receipt/',dream.views.receipt,name="recipt"),
    path('mypage/',dream.views.mypage,name="mypage"),
    path('mem_info/',dream.views.mem_info,name="mem_info"),
    path('card/', dream.views.card, name="card"),

    path('dream_map/', dream.views.dream_map, name="dream_map"),
    path('member/',dream.views.member, name="member"),

]

