from django.db import models
import datetime as dt
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.gis.db import models
from django.contrib.auth.models import User
from pyuploadcare.dj.models import ImageField
from django.contrib.contenttypes.fields import GenericRelation
from star_ratings.models import Rating
from djchoices import ChoiceItem, DjangoChoices
from datetime import datetime
# Create your models here.

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=20,default="tony")
    pic = ImageField(blank=True, manual_crop="")
    bio = models.CharField(default="Hi!", max_length = 30)
    
    def __str__(self):
        return self.name
    
    @classmethod
    def search_user(cls,name):
        return User.objects.filter(username__icontains = name)
    
class Housing(models.Model):
    HOUSE_CATEGORY={
    ("Flats and Apartments","flats and apartments"),
    ("Studio ","studio"),
    ("Houses","houses"),
    ("Town Houses","town houses"),
    ("Bungalows","bungalows"),
    ("Hostels","hostels"),
    ("Rooms","rooms"),
    ("Bedsitters","bedsitters"),
    ("Single Rooms","single rooms"),
    ("Mansionette","mansionette"),
    ("Container Houses","container houses")
}
    PAYMENT={
        ("M-pesa","M-pesa"),
        ("Paypal","Paypal")
    }
    AMENITIES={
        ("Security","Security"),
        ("Water","Water"),
        ("Electricity","Electricity"),
        (" Good Road","Good Road"),
        ("Hospital","Hospital"),
        ("School","School")
    }
    STATUS={
        ("For Rent","For Rent"),
        ("For Sale","For Sale")
        }
    name=models.CharField(max_length=20,null=False,default="tony")
    owner_name=models.ForeignKey(Profile,max_length=20, on_delete=models.CASCADE, related_name='housing', null=True)
    national_id = models.IntegerField(null=False,blank=False,default='23456789')
    phone=models.IntegerField(null=True,blank=False,default='0723456756')
    email=models.CharField(max_length=50,blank=True,default="abc@gmail.com")
    postal_address=models.IntegerField(blank=True,default='07-00902')
    status = models.CharField(max_length=50,choices=STATUS,default="for rent")
    opening_days=models.CharField(max_length=50,default='monday to friday')
    opening= models.IntegerField(null=False,blank=False,default='0700')
    closing= models.IntegerField(null=False,blank=False,default='1700')
    address = models.CharField(max_length=100,blank=False,default='Moringa School')
    country= models.CharField(max_length=50,blank=False,default='Kenya')
    county= models.CharField(max_length=50,blank=False,default='Nairobi')
    city = models.CharField(max_length=50,blank=False,default='Nairobi')
    town = models.CharField(max_length=50,blank=False,default='Nakuru')
    village = models.CharField(max_length=50,blank=True,default="mamba")
    location = models.PointField()
    description=models.TextField(max_length=10000,null=False,default="The Best")
    company = models.CharField(max_length=20,null=False,default='Five star apartments')
    image=ImageField(blank=True, manual_crop="")
    image1=ImageField(blank=True, manual_crop="")
    image2=ImageField(blank=True, manual_crop="")
    image3=ImageField(blank=True, manual_crop="")
    image4=ImageField(blank=True, manual_crop="")
    image5=ImageField(blank=True, manual_crop="")
    posting_date = models.DateTimeField(auto_now = True)
    size = models.IntegerField(null=False,blank=False,default="10*10")
    firnished =models.BooleanField(null=False,blank=False,default=False)
    unfirnished =models.BooleanField(null=False,blank=False,default=False)
    amenities = models.CharField(max_length=50,choices=AMENITIES,default="security")
    price =models.IntegerField(null=True,blank=False,default='100')
    mode_of_payment = models.CharField(max_length=50,choices=PAYMENT,default="m-pesa")
    category=models.CharField(max_length=100,choices=HOUSE_CATEGORY,default="appartment")
    verified=models.BooleanField(null=False,blank=False,default=False)
    ratings = GenericRelation(Rating, related_query_name='housing')
    
    def __str__(self):
        return self.name

    def create_housing(self):
        self.save()

    @classmethod
    def find_housing(cls,housing_id):
        housing = cls.objects.filter(id=housing_id)
        return housing

    @classmethod
    def update_housing(cls):
        info = cls.objects.all().update()
        info.save()
        return info

    def delete_housing(self):
        self.delete()
        
        #   FILTERS
    @classmethod
    def housing_company(cls):
        company = cls.objects.order_by('company')
        return company
    @classmethod
    def housing_date(cls):
        date = cls.objects.order_by('posting_date')
        return date
    @classmethod
    def housing_country(cls):
        country = cls.objects.order_by('country')
        return country
    @classmethod
    def housing_county(cls):
        county = cls.objects.order_by('county')
        return county
    @classmethod
    def housing_city(cls):
        city = cls.objects.order_by('city')
        return city
    @classmethod
    def housing_town(cls):
        town = cls.objects.order_by('town')
        return town
    @classmethod
    def housing_village(cls):
        village = cls.objects.order_by('village')
        return village
    @classmethod
    def housing_ratings(cls):
        ratings = cls.objects.order_by('ratings')
        return ratings
    @classmethod
    def housing_verification(cls):
        verification = cls.objects.order_by('verification')
        return verification
    @classmethod
    def housing_category(cls):
        category = cls.objects.order_by('category')
        return category
    @classmethod
    def housing_price(cls):
        price = cls.objects.order_by('price')
        return price
    @classmethod
    def housing_size(cls):
        size = cls.objects.order_by('size')
        return size
    @classmethod
    def housing_firnished(cls):
        firnished = cls.objects.order_by('firnished')
        return firnished
    @classmethod
    def housing_unfirnished(cls):
        unfirnished = cls.objects.order_by('unfirnished')
        return unfirnished
    @classmethod
    def housing_amenities(cls):
        amenities = cls.objects.order_by('amenities')
        return amenities
    
# Housing.objects.filter(ratings__isnull=False).order_by('ratings__average')

class Business(models.Model):
    BUSINESS_CATEGORY={
    ("Foods","foods"),
    ("Restaurants ","restaurants"),
    ("Hospitals","hospitals"),
    ("Supermarkets","supermarkets"),
    ("Bars","bars"),
    ("Bookshop","bookshop"),
    ("Electric Hardware","electric hardware"),
    ("Construction Material Hardware","construction material hardware"),
    ("Botique","botique"),
}
    STATUS={
        ("In Business","In business"),
        ("For Sale","For Sale")
        }
    
    name=models.CharField(max_length=20,null=False,default="tony")
    owner_name=models.ForeignKey(Profile,max_length=20, on_delete=models.CASCADE, related_name='business', null=True)
    national_id = models.IntegerField(null=False,blank=False,default='23456789')
    phone=models.IntegerField(null=True,blank=False,default='0723456756')
    email=models.CharField(max_length=50,blank=True,default="abc@gmail.com")
    postal_address=models.IntegerField(blank=True,default='07-00902')
    status = models.CharField(max_length=50,choices=STATUS,default="for rent")
    opening_days=models.CharField(max_length=50,default='monday to friday')
    opening= models.IntegerField(null=False,blank=False,default='0700')
    closing= models.IntegerField(null=False,blank=False,default='1700')
    address = models.CharField(max_length=100,blank=False,default='Moringa School')
    country= models.CharField(max_length=50,blank=False,default='Kenya')
    county= models.CharField(max_length=50,blank=False,default='Nairobi')
    city = models.CharField(max_length=50,blank=False,default='Nairobi')
    town = models.CharField(max_length=50,blank=False,default='Nakuru')
    village = models.CharField(max_length=50,blank=True,default="mamba")
    location = models.PointField()
    description=models.TextField(max_length=1000,null=False,default='The best')
    company = models.CharField(max_length=20,null=False,default='johnsons family business')
    image=ImageField(blank=True, manual_crop="")
    image1=ImageField(blank=True, manual_crop="")
    image2=ImageField(blank=True, manual_crop="")
    image3=ImageField(blank=True, manual_crop="")
    image4=ImageField(blank=True, manual_crop="")
    image5=ImageField(blank=True, manual_crop="")
    posting_date = models.DateTimeField(auto_now = True)
    category=models.CharField(max_length=100,choices= BUSINESS_CATEGORY,default="Hotel")
    verified=models.BooleanField(null=False,blank=False,default=False)
    ratings = GenericRelation(Rating, related_query_name='business')

    def __str__(self):
        return self.name

    def create_business(self):
        self.save()

    @classmethod
    def find_business(cls, business_id):
        business = cls.objects.filter(id=business_id)
        return business

    @classmethod
    def update_business(cls):
        info = cls.objects.all().update()
        info.save()
        return info

    def delete_business(self):
        self.delete()
        
        # FILTERS
    @classmethod
    def business_company(cls):
        company = cls.objects.order_by('company')
        return company
    @classmethod
    def business_date(cls):
        date = cls.objects.order_by('posting_date')
        return date
    @classmethod
    def business_country(cls):
        country = cls.objects.order_by('country')
        return country
    @classmethod
    def business_county(cls):
        county = cls.objects.order_by('county')
        return county
    @classmethod
    def business_city(cls):
        city = cls.objects.order_by('city')
        return city
    @classmethod
    def business_town(cls):
        town = cls.objects.order_by('town')
        return town
    @classmethod
    def business_village(cls):
        village = cls.objects.order_by('village')
        return village
    @classmethod
    def business_ratings(cls):
        ratings = cls.objects.order_by('ratings')
        return ratings
    @classmethod
    def business_verification(cls):
        verification = cls.objects.order_by('verification')
        return verification
    @classmethod
    def business_category(cls):
        category = cls.objects.order_by('category')
        return category


class Services(models.Model):
    SERVICE_CATEGORY={
    ("Phone repair","phone repair"),
    ("Shoe repair","shoe repair"),
    ("Barber","barber"),
    ("Spa","spa"),
    ("Saloon","saloon"),
    ("Library","library"),
    ("Water point","water point"),
    ("Massage","massage"),
    ("Kibanda foods","kibanda foods"),
    ("Lawyers","lawyers"),
    ("T-shirt Printing","T-shirt Printing"),
    ("Plumber","plumber"),
    ("Security Guard","security guard"),
    ("Vehicle Branding","vehicle branding"),
    ("Swimming Pool maintenance","swimming pool maintenance"),
    ("Car Tracking","car tracking"),
    ("Photographer","photographer"),
    ("Gardener","gardener"),
    ("Church,Mosque","church,mosque"),
    ("Fencing service","fencing service"),
    ("Cyber","cyber"),
    ("House maid service","house maid service"),
    ("Electrician","Electrician")
}
    STATUS={
        ("In Business","In business"),
        ("For Sale","For Sale")
        }
    # AVAILABLE={
    # ("YES","yes"),
    # ("NO","no")
    # }
    name=models.CharField(max_length=20,null=False,default="tony")
    owner_name=models.ForeignKey(Profile,max_length=20, on_delete=models.CASCADE, related_name='services', null=True)
    national_id = models.IntegerField(null=False,blank=False,default='23456789')
    phone=models.IntegerField(null=True,blank=False,default='0723456756')
    email=models.CharField(max_length=50,blank=True,default="abc@gmail.com")
    postal_address=models.IntegerField(blank=True,default='07-00902')
    status = models.CharField(max_length=50,choices=STATUS,default="for rent")
    opening_days=models.CharField(max_length=50,default='monday to friday')
    opening= models.IntegerField(null=False,blank=False,default='0700')
    closing= models.IntegerField(null=False,blank=False,default='1700')
    address = models.CharField(max_length=100,blank=False,default='Moringa School')
    country= models.CharField(max_length=50,blank=False,default='Kenya')
    county= models.CharField(max_length=50,blank=False,default='Nairobi')
    city = models.CharField(max_length=50,blank=False,default='Nairobi')
    town = models.CharField(max_length=50,blank=False,default='Nakuru')
    village = models.CharField(max_length=50,blank=True,default="mamba")
    location = models.PointField()
    description=models.TextField(max_length=1000,null=False,default='The best')
    company = models.CharField(max_length=20,null=False,default='Cheap and fast enterprise')
    image=ImageField(blank=True, manual_crop="")
    image1=ImageField(blank=True, manual_crop="")
    image2=ImageField(blank=True, manual_crop="")
    image3=ImageField(blank=True, manual_crop="")
    image4=ImageField(blank=True, manual_crop="")
    image5=ImageField(blank=True, manual_crop="")
    posting_date = models.DateTimeField(auto_now = True)
    category=models.CharField(max_length=100,choices= SERVICE_CATEGORY,default="plumber")
    price =models.IntegerField(null=True,blank=False,default='100')
    available=models.BooleanField(null=False,blank=False,default=False)
    meeting_point = models.CharField(max_length=50,blank=False,default="greenhouse")
    verified=models.BooleanField(null=False,blank=False,default=False)
    ratings = GenericRelation(Rating, related_query_name='service')

    
    def __str__(self):
        return self.name

    def create_services(self):
        self.save()

    @classmethod
    def find_services(cls, services_id):
        services = cls.objects.filter(id=services_id)
        return services

    @classmethod
    def update_services(cls):
        info = cls.objects.all().update()
        info.save()
        return info

    def delete_services(self):
        self.delete()
        
# FILTERS

    @classmethod
    def service_company(cls):
        company = cls.objects.order_by('company')
        return company
    @classmethod
    def service_date(cls):
        date = cls.objects.order_by('posting_date')
        return date
    @classmethod
    def service_country(cls):
        country = cls.objects.order_by('country')
        return country
    @classmethod
    def service_county(cls):
        county = cls.objects.order_by('county')
        return county
    @classmethod
    def service_city(cls):
        city = cls.objects.order_by('city')
        return city
    @classmethod
    def service_town(cls):
        town = cls.objects.order_by('town')
        return town
    @classmethod
    def service_village(cls):
        village = cls.objects.order_by('village')
        return village
    @classmethod
    def service_ratings(cls):
        ratings = cls.objects.order_by('ratings')
        return ratings
    @classmethod
    def service_verification(cls):
        verification = cls.objects.order_by('verification')
        return verification
    @classmethod
    def service_category(cls):
        category = cls.objects.order_by('category')
        return category
    @classmethod
    def service_price(cls):
        price = cls.objects.order_by('price')
        return price
    @classmethod
    def service_price(cls):
        available = cls.objects.order_by('available')
        return available
# Services.objects.filter(ratings__isnull=False).order_by('ratings__average')

class Comments(models.Model):
    comment = models.CharField(max_length=1000, null=True)
    business = models.ForeignKey(Business, related_name='comment', null=True,on_delete=models.CASCADE,)
    housing = models.ForeignKey(Housing, related_name='comment', null=True,on_delete=models.CASCADE,)
    services = models.ForeignKey(Services, related_name='comment', null=True,on_delete=models.CASCADE,)
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="comment", null=True)
    commented_on = models.DateTimeField(auto_now = True)
    
    def save_comment(self):
        self.save()
    