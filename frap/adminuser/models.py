from django.db import models


class Admin(models.Model):
    name = models.CharField(max_length=10)
    password = models.CharField(max_length=255)
    department = models.CharField(max_length=30)
    role = models.CharField(max_length=5)

    class Meta:
        db_table = "admin"
