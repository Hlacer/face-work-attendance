# Generated by Django 4.0.1 on 2022-02-14 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
                ('password', models.CharField(max_length=255)),
                ('department', models.CharField(max_length=30)),
                ('role', models.CharField(max_length=5)),
            ],
            options={
                'db_table': 'admin',
            },
        ),
    ]
