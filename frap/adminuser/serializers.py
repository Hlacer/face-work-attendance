from rest_framework import serializers
from . import models


class AdminUserSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Admin
        fields = '__all__'
