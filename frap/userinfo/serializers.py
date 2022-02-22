from rest_framework import serializers
from . import models


class UserInfoSerializer(serializers.ModelSerializer):
    '''user_id = serializers.CharField(max_length=20, label="工号")
    wechat_openid = serializers.CharField(max_length=40, default="", label="微信openid")
    user_name = serializers.CharField(max_length=10, label="姓名")
    user_gender = serializers.CharField(max_length=5, label="性别")
    user_dept = serializers.CharField(max_length=15, label="部门")
    user_phone = serializers.CharField(max_length=20, label="手机号")
    create_time = serializers.DateField(label="创建日期", read_only=True)

    def create(self, validated_data):
        return models.UserInfo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.wechat_openid = validated_data.get('wechat_openid', instance.wechat_openid)
        instance.user_name = validated_data.get('user_name', instance.user_name)
        instance.save()
        return instance'''
    class Meta:
        model = models.UserInfo
        fields = '__all__'

class UserFaceSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.UserFace
        fields = '__all__'
