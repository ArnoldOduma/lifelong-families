from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import Profile,Housing,Business,Services
# Register your models here.
@admin.register(Profile)
class ProfileAdmin(OSMGeoAdmin):
    list_display = ('user','pic','bio')
    
@admin.register(Housing)
class HousingAdmin(OSMGeoAdmin):
    list_display = ('name','image','location','address','city','contact','description','verified')
    
@admin.register(Business)
class BusinessAdmin(OSMGeoAdmin):
    list_display = ('name','location','address','city','contact','description','category','verified')
    
@admin.register(Services)
class ServicesAdmin(OSMGeoAdmin):
    list_display = ('name','location','address','image','city','category','price','descript