# Generated by Django 3.1.5 on 2022-01-01 08:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0008_price_weight'),
    ]

    operations = [
        migrations.CreateModel(
            name='Courier',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('weight_upto', models.FloatField(verbose_name='Weight Upto')),
                ('price', models.FloatField(verbose_name='Price')),
            ],
        ),
    ]
