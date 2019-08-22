# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-08-22 06:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('life', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='business',
            name='category',
            field=models.CharField(choices=[('Supermarkets', 'supermarkets'), ('Restaurants ', 'restaurants'), ('Bars', 'bars'), ('Hospitals', 'hospitals'), ('Electric Hardware', 'electric hardware'), ('Construction Material Hardware', 'construction material hardware'), ('Botique', 'botique'), ('Foods', 'foods'), ('Bookshop', 'bookshop')], max_length=1000),
        ),
        migrations.AlterField(
            model_name='housing',
            name='category',
            field=models.CharField(choices=[('Houses', 'houses'), ('Rooms', 'rooms'), ('Hostels', 'hostels'), ('Studio ', 'studio'), ('Town Houses', 'town houses'), ('Single Rooms', 'single rooms'), ('Bungalows', 'bungalows'), ('Bedsitters', 'bedsitters'), ('Flats and Apartments', 'flats and apartments')], max_length=1000),
        ),
        migrations.AlterField(
            model_name='services',
            name='available',
            field=models.CharField(choices=[('NO', 'no'), ('YES', 'yes')], max_length=1000),
        ),
        migrations.AlterField(
            model_name='services',
            name='category',
            field=models.CharField(choices=[('Phone repair', 'phone repair'), ('Library', 'library'), ('Water point', 'water point'), ('Kibanda foods', 'kibanda foods'), ('Saloon', 'saloon'), ('Shoe repair', 'shoe repair'), ('Barber', 'barber'), ('Massage', 'massage'), ('Spa', 'spa')], max_length=1000),
        ),
    ]