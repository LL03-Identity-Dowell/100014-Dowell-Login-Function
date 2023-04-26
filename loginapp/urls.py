from django.urls import path
from loginapp import views

urlpatterns = [
    path('register/', views.register, name="register"),
    path('login/', views.login, name="login"),
    path('logout/', views.logout, name="logout"),
    path('register/legalpolicy/', views.register_legal_policy,
         name="register_legal_policy"),
    path('login/legalpolicy/', views.login_legal_policy,
         name="login_legal_policy"),

    path('update_qrobj/', views.update_qrobj, name="update_qrobj"),
    path('qr_creation/', views.qr_creation, name="qr_creation"),

    path('forgot_username', views.forgot_username, name="forgot_username"),
    path('forgot_password/', views.forgot_password, name="forgot_password"),
]
