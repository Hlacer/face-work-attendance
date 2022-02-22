from django.urls import path,include

urlpatterns = [
    path('userinfo/', include('userinfo.urls')),
    path('attendance/',include('attendance.urls')),
    path('adminuser/',include('adminuser.urls'))
]
