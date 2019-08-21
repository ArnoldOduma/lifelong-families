# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-08-21 20:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('life', '0002_auto_20190821_1344'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='profilepic',
        ),
        migrations.AlterField(
            model_name='business',
            name='category',
            field=models.CharField(choices=[('Bookshop', 'bookshop'), ('Hospitals', 'hospitals'), ('Bars', 'bars'), ('Construction Material Hardware', 'construction material hardware'), ('Foods', 'foods'), ('Electric Hardware', 'electric hardware'), ('Restaurants ', 'restaurants'), ('Supermarkets', 'supermarkets'), ('Botique', 'botique')], max_length=1000),
        ),
        migrations.AlterField(
            model_name='housing',
            name='category',
            field=models.CharField(choices=[('Studio ', 'studio'), ('Bedsitters', 'bedsitters'), ('Houses', 'houses'), ('Hostels', 'hostels'), ('Flats and Apartments', 'flats and apartments'), ('Rooms', 'rooms'), ('Single Rooms', 'single rooms'), ('Town Houses', 'town houses'), ('Bungalows', 'bungalows')], max_length=1000),
        ),
        migrations.AlterField(
            model_name='services',
            name='available',
            field=models.CharField(choices=[('NO', 'no'), ('YES', 'yes')], max_length=1000),
        ),
        migrations.AlterField(
            model_name='services',
            name='category',
            field=models.CharField(choices=[('Spa', 'spa'), ('Barber', 'barber'), ('Kibanda foods', 'kibanda foods'), ('Water point', 'water point'), ('Shoe repair', 'shoe repair'), ('Massage', 'massage'), ('Library', 'library'), ('Phone repair', 'phone repair'), ('Saloon', 'saloon')], max_length=1000),
        ),
    ]
