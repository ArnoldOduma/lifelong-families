from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import Profile,Housing,Business,Services
# Register your models here.
@admin.register(Profile)
class ProfileAdmin(OSMGeoAdmin):
    list_display = ('user','pic','bio')
    
@admin.register(Housing)
class HousingAdmin(OSMGeoAdmin):
    
    list_display = ('name','national_id','phone','email','postal_address','status','opening_days','opening','closing','address','country','county','city','town','village','location','description','company','image','image1','image2','image3','image4','image5','posting_date','size','firnished','unfirnished','amenities','price','mode_of_payment','category','verified','ratings')
    
@admin.register(Business)
class BusinessAdmin(OSMGeoAdmin):
    list_display = ('name','national_id','phone','email','postal_address','status','opening_days','opening','closing','address','country','county','city','town','village','location','description','company','image','image1','image2','image3','image4','image5','posting_date','category','verified','ratings')
    
@admin.register(Services)
class ServicesAdmin(OSMGeoAdmin):
    list_display = ('name','national_id','phone','email','postal_address','status','opening_days','opening','closing','address','country','county','city','town','village','location','description','company','image','image1','image2','image3','image4','image5','posting_date','category','price','available','meeting_point','verified','ratings')