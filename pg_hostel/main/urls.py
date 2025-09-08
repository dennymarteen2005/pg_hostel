from django.urls import path
from . import views

urlpatterns = [
    path("owner/login/", views.owner_login, name="owner_login"),
    path("owner/signup/", views.owner_signup, name="owner_signup"),
    path("user/login/", views.user_login, name="user_login"),
    path("user/signup/", views.user_signup, name="user_signup"),
    path('users/', views.users_page, name='users_page'),
]
