from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import Profile,Housing,Business,Service
# Register your models here.
@admin.register(Profile)
class ProfileAdmin(OSMGeoAdmin):
    list_display = ('_all_')
    
@admin.register(Housing)
class HousingAdmin(OSMGeoAdmin):
    list_display = ("_all_")
    
@admin.register(Business)
class BusinessAdmin(OSMGeoAdmin):
    list_display = ("_all_")
    
@admin.register(Service)
class ServiceAdmin(OSMGeoAdmin):
    list_display = ('_all_')