from django.urls import path
from . import views


urlpatterns = [
    path('',views.AdminUser.as_view()),
    path('login/',views.AdminUserLogin.as_view())
]
