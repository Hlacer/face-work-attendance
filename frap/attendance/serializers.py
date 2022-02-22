from rest_framework import serializers
from . import models


class AttendanceTimeSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.AttendanceTime
        fields = '__all__'


class UserAttendanceSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.UserAttendance
        exclude = ('attendance_id',)
