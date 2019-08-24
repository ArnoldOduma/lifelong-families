from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import Profile,Housing,Business,Services
# Register your models here.
@admin.register(Profile)
class ProfileAdmin(OSMGeoAdmin):
    list_display = ('user','pic','bio')
    
@admin.register(Housing)
class HousingAdmin(OSMGeoAdmin):
    
    list_display = ('name','image','image1','image2','image3','image4','image5','location','address','city','contact','description','category','verified')
    
@admin.register(Business)
class BusinessAdmin(OSMGeoAdmin):
    list_display = ('name','location','image','image1','image2','image3','image4','image5','address','city','contact','description','category','verified')
    
@admin.register(Services)
class ServicesAdmin(OSMGeoAdmin):
    list_display = ('name','location','address','image','image1','image2','image3','image4','image5','city','category','price','description','contact','available','verified')