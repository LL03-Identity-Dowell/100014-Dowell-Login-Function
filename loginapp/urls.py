from django.urls import path
from loginapp import views

urlpatterns = [
    path('register/',views.RegisterPage,name="register"),
    path('register/',views.LoginPage,name="login"),
]
