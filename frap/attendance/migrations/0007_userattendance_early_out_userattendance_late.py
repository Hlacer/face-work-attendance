# Generated by Django 4.0.1 on 2022-02-22 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attendance', '0006_alter_userattendance_attendance_state'),
    ]

    operations = [
        migrations.AddField(
            model_name='userattendance',
            name='early_out',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userattendance',
            name='late',
            field=models.BooleanField(default=False),
        ),
    ]
