from django.urls import path
from loginapp import views

urlpatterns = [
    path('register/', views.register, name="register"),
    path('login/', views.login, name="login"),
    path('logout/', views.logout, name="logout"),
    path('legalpolicy/', views.legal_policy, name="legal_policy"),
    path('update_qrobj/', views.update_qrobj, name="update_qrobj"),
    path('qr_creation/', views.qr_creation, name="qr_creation"),
    path('forgot_password/', views.forgot_password, name="forgot_password"),
]
