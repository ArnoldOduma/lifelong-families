from django.db import models
from django.contrib.gis.db import models
from django.contrib.auth.models import User
from pyuploadcare.dj.models import ImageField
from django.contrib.contenttypes.fields import GenericRelation
from star_ratings.models import Rating
from djchoices import ChoiceItem, DjangoChoices
# Create your models here.
class User(models.Model):
    is_authenticated = True
    username = models.CharField(max_length =50)
    email = models.CharField(max_length=200,default='ads@gmail')
class Profile(models.Model):
    user = models.OneToOneField(User,max_length=30,null=False,on_delete=models.CASCADE,)
    pic = ImageField(blank=True, manual_crop="")
    bio = models.CharField(default="Hi!", max_length = 30)
    def save_user(self):
        self.save()
        
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
    id= models.PositiveIntegerField(primary_key=True)
    owner_name=models.CharField(max_length=30,null=True)
    name=models.CharField(max_length=20,null=False)
    image=ImageField(blank=True, manual_crop="")
    image1=ImageField(blank=True, manual_crop="")
    image2=ImageField(blank=True, manual_crop="")
    image3=ImageField(blank=True, manual_crop="")
    image4=ImageField(blank=True, manual_crop="")
    image5=ImageField(blank=True, manual_crop="")
    location = models.GeometryField()
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    contact=models.IntegerField(null=True,blank=False)
    description=models.TextField(max_length=10000,null=False)
    opening_days=models.CharField(max_length=50,default='monday to friday')
    opening= models.IntegerField(null=False,blank=False)
    closing= models.IntegerField(null=False,blank=False)
    category=models.CharField(max_length=1000,choices=HOUSE_CATEGORY)
    verified=models.BooleanField(null=False,blank=False)
    ratings = GenericRelation(Rating, related_query_name='housing')
    # Housing.objects.filter(ratings__isnull=False).order_by('ratings__average')
    
    
    def __str__(self):
        return self.name

    def create_housing(self):
        """
        method to save project images
        :return:
        """
        self.save()

    @classmethod
    def find_housing(cls,housing_id):
        """
        method to get image by id
        :return:
        """
        housing = cls.objects.filter(id=housing_id)
        return housing

    @classmethod
    def update_housing(cls):
        """
        method to update neighbourhood details
        :return:
        """
        info = cls.objects.all().update()
        info.save()
        return info

    def delete_housing(self):
        """
        method to delete image
        :return:
        """
        self.delete()

    @classmethod
    def search_housing(cls, search_term):
        """
        method to search for business by neighbourhood
        :return:
        """
        housing = cls.objects.filter(housing__name__icontains=search_term)
        return housing

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
    id= models.PositiveIntegerField(primary_key=True)
    owner_name=models.CharField(max_length=30,null=True)
    name=models.CharField(max_length=20,null=False)
    location = models.GeometryField()
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    image=ImageField(blank=True, manual_crop="")
    image1=ImageField(blank=True, manual_crop="")
    image2=ImageField(blank=True, manual_crop="")
    image3=ImageField(blank=True, manual_crop="")
    image4=ImageField(blank=True, manual_crop="")
    image5=ImageField(blank=True, manual_crop="")
    contact=models.IntegerField(null=True,blank=False)
    description=models.TextField(max_length=10000,null=False)
    opening_days=models.CharField(max_length=50,default='monday to friday')
    opening= models.IntegerField(null=False,blank=False)
    closing= models.IntegerField(null=False,blank=False)
    category=models.CharField(max_length=1000,choices= BUSINESS_CATEGORY)
    verified=models.BooleanField(null=False,blank=False)
    ratings = GenericRelation(Rating, related_query_name='business')
    
    # Business.objects.filter(ratings__isnull=False).order_by('ratings__average')
    
    
    def __str__(self):
        return self.name

    def create_business(self):
        """
        method to save project images
        :return:
        """
        self.save()

    @classmethod
    def find_business(cls, business_id):
        """
        method to get image by id
        :return:
        """
        business = cls.objects.filter(id=business_id)
        return business

    @classmethod
    def update_business(cls):
        """
        method to update neighbourhood details
        :return:
        """
        info = cls.objects.all().update()
        info.save()
        return info

    def delete_business(self):
        """
        method to delete image
        :return:
        """
        self.delete()

    @classmethod
    def search_business(cls, search_term):
        """
        method to search for business by neighbourhood
        :return:
        """
        business = cls.objects.filter(biz__name__icontains=search_term)
        return business

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
    ("House maid service","house maid service")
}
    AVAILABLE={
    ("YES","yes"),
    ("NO","no")
    }
    id= models.PositiveIntegerField(primary_key=True)
    owner_name=models.CharField(max_length=30,null=True)
    name=models.CharField(max_length=20,null=False)
    location = models.GeometryField()
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    image=ImageField(blank=True, manual_crop="")
    image1=ImageField(blank=True, manual_crop="")
    image2=ImageField(blank=True, manual_crop="")
    image3=ImageField(blank=True, manual_crop="")
    image4=ImageField(blank=True, manual_crop="")
    image5=ImageField(blank=True, manual_crop="")
    category=models.CharField(max_length=1000,choices= SERVICE_CATEGORY)
    price =models.IntegerField(null=True,blank=False)
    description=models.TextField(max_length=10000,null=False)
    contact=models.IntegerField(null=True,blank=False)
    opening_days=models.CharField(max_length=50,default='monday to friday')
    opening= models.IntegerField(null=False,blank=False)
    closing= models.IntegerField(null=False,blank=False)
    available=models.CharField(max_length=1000,choices= AVAILABLE)
    meeting = models.CharField(max_length=50,blank=False,default="greenhouse")
    verified=models.BooleanField(null=False,blank=False)
    ratings = GenericRelation(Rating, related_query_name='service')
    
    
    def __str__(self):
        return self.name

    def create_services(self):
        """
        method to save project images
        :return:
        """
        self.save()

    @classmethod
    def find_services(cls, services_id):
        """
        method to get image by id
        :return:
        """
        services = cls.objects.filter(id=services_id)
        return services

    @classmethod
    def update_services(cls):
        """
        method to update neighbourhood details
        :return:
        """
        info = cls.objects.all().update()
        info.save()
        return info

    def delete_services(self):
        """
        method to delete image
        :return:
        """
        self.delete()

    @classmethod
    def search_services(cls, search_term):
        """
        method to search for business by neighbourhood
        :return:
        """
        services = cls.objects.filter(service__name__icontains=search_term)
        return services

class Comments(models.Model):
    comment = models.CharField(max_length=10000, null=True)
    bsn = models.ForeignKey(Business, related_name='comment', null=True,on_delete=models.CASCADE,)
    hsng = models.ForeignKey(Housing, related_name='comment', null=True,on_delete=models.CASCADE,)
    svc = models.ForeignKey(Services, related_name='comment', null=True,on_delete=models.CASCADE,)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comment", null=True)

    def save_comment(self):
        self.save()
    