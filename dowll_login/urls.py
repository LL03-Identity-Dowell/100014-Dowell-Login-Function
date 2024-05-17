from django.contrib import admin
from django.urls import path
from dowll_login.views import *
urlpatterns = [
    path("",Home,name="home"),
]