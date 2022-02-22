from django.db import models


class UserInfo(models.Model):
    user_id = models.CharField(max_length=20, primary_key=True)
    wechat_openid = models.CharField(max_length=40, default="")
    user_name = models.CharField(max_length=10)
    user_gender = models.CharField(max_length=5)
    user_dept = models.CharField(max_length=15)
    user_phone = models.CharField(max_length=20)
    create_time = models.DateField(auto_now_add=True)

    class Meta:
        db_table = "user_info"


class UserFace(models.Model):
    pic_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=10)
    face_path = models.CharField(max_length=100)

    class Meta:
        db_table = "user_face"
