# Generated by Django 2.2.10 on 2020-03-09 11:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('magic_shop', '0003_auto_20200309_1107'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='url',
            field=models.CharField(max_length=200),
        ),
    ]
