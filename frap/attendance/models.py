from django.db import models

from userinfo.models import UserInfo


class AttendanceTime(models.Model):
    time_id = models.AutoField(primary_key=True)
    attendance_time = models.CharField(max_length=20)
    out_time = models.CharField(max_length=20)
    attendance_place = models.CharField(max_length=30)
    attendance_coordinate = models.CharField(max_length=30)

    class Meta:
        db_table = "attendance_time"


class UserAttendance(models.Model):
    attendance_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=10)
    attendance_date = models.DateField()
    attendance_time = models.CharField(max_length=20)
    attendance_out_time = models.CharField(max_length=20)
    attendance_state = models.CharField(max_length=5,default='缺勤')
    late = models.BooleanField(default=False)
    early_out = models.BooleanField(default=False)

    class Meta:
        db_table = "user_attendance"
