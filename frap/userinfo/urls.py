from django.urls import path
from . import views
urlpatterns = [
    path('',views.User.as_view()),
    path('openid/',views.OpenId.as_view()),
    path('face/',views.Face.as_view()),
    path('check/',views.CheckFace.as_view())
]