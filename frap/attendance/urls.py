from django.urls import path
from . import views
urlpatterns = [
    path('',views.Attendance.as_view()),
    path('search/',views.Search.as_view()),
    path('face/',views.AttendanceUser.as_view()),
    path('user_table/<start_time>', views.UserAdOneTimeTable.as_view()),
    path('user_table/<start_time>/<end_time>', views.UserAdTwoTimeTable.as_view()),
    path('user_excel/<start_time>',views.UserAdOneTimeExcel.as_view()),
    path('user_excel/<start_time>/<end_time>',views.UserAdTwoTimeExcel.as_view()),
    path('dept_table/<department>/<start_time>/<end_time>',views.DeptAdTable.as_view()),
    path('dept_excel/<department>/<start_time>/<end_time>', views.DeptExcel.as_view())
]