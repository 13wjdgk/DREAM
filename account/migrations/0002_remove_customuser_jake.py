# Generated by Django 3.2.4 on 2021-07-01 10:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='jake',
        ),
    ]
