from django.urls import path
from api import views
urlpatterns = [
    path('mobilelogin/', views.MobileLogin, name='mobilelogin'),
    path('mobilelogout/', views.MobileLogout, name='mobilelogout'),
    path('linkbased/', views.LinkBased, name='linkbased'),

    path('profile_view/', views.profile_view, name='profile_view'),
    path('profile_update/', views.profile_update, name='profile_update'),
    path('password_change/', views.password_change, name='password_change'),
    path('userinfo/', views.new_userinfo, name="userinfo"),
    path('all_users/', views.all_users, name="all_users"),
    path('lastlogins/', views.lastlogins, name="lastlogins"),
    path('activeusers/', views.activeusers, name="activeusers"),
    path('live_users/', views.live_users, name="live_users"),

    path("create_live_user/", views.live_user, name='live_user'),
    path("create_product_user/", views.product_users, name='product_user'),
    path("all_liveusers/", views.all_liveusers, name='all_liveusers'),
    path("country_codes/", views.get_country_codes, name='country_codes'),
    path("forgot_password/", views.forgot_password, name='api_forgot_password'),
    path("forgot_username/", views.forgot_username, name='api_forgot_username'),

]
