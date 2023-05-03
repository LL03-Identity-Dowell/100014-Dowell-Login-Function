from django.urls import path
from api import views
urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('mobilelogin/', views.MobileLogin, name='mobilelogin'),
    path('mobilelogout/', views.MobileLogout, name='mobilelogout'),
    path('linkbased/', views.LinkBased, name='linkbased'),

    path('profile_view/', views.profile_view, name='profile_view'),
    path('profile_update/', views.profile_update, name='profile_update'),
    path('password_change/', views.password_change, name='password_change'),
    path('registration/', views.Registration, name='registration'),
    path('userinfo/', views.new_userinfo, name="userinfo"),
    path('all_users/', views.all_users, name="all_users"),
    path('lastlogins/', views.lastlogins, name="lastlogins"),
    path('activeusers/', views.activeusers, name="activeusers"),
]
