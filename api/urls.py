from django.contrib import admin
from django.urls import path
from api.views import *
urlpatterns = [
    path("register",register,name="register"),
    path('mobilesms/',mobilesms, name="mobilesms"),
    path('mobile_otp/',mobile_otp, name='mobile_otp_api'),
    path('emailotp/',email_otp, name='email_otp_api'),
    path('otp_verify/',otp_verify, name="otp_verify"),
]