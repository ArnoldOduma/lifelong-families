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
    ("Single Rooms","single rooms")
}
    class Opening(DjangoChoices):
        HOURS={
            ('0400','0400'),
            ('0500','0500'),
            ('0600','0600'),
            ('0700','0700'),
            ('0800','0800'),
            ('0900','0900'),
            ('1000','1000'),
            ('1100','1100'),
            ('1200','1200')
        }
        monday = ChoiceItem(choice=HOURS)
        tuesday = ChoiceItem(choice=HOURS)
        wenesday = ChoiceItem(choice=HOURS)
        thursday = ChoiceItem(choice=HOURS)
        friday = ChoiceItem(choice=HOURS)
        saturday = ChoiceItem(choice=HOURS)
        sunday = ChoiceItem(choice=HOURS)
    class Closing(DjangoChoices):
        HOURS={
            ('1400','1400'),
            ('1500','1500'),
            ('1600','1600'),
            ('1700','1700'),
            ('1800','1800'),
            ('1900','1900'),
            ('2000','2000')
        }
        monday = ChoiceItem(choice=HOURS)
        tuesday = ChoiceItem(choice=HOURS)
        wenesday = ChoiceItem(choice=HOURS)
        thursday = ChoiceItem(choice=HOURS)
        friday = ChoiceItem(choice=HOURS)
        saturday = ChoiceItem(choice=HOURS)
        sunday = ChoiceItem(choice=HOURS)
    name=models.CharField(max_length=20,null=False)
    image=ImageField(blank=True, manual_crop="")
    image1=ImageField(blank=True, manual_crop="")
    image2=ImageField(blank=True, manual_crop="")
    image3=ImageField(blank=True, manual_crop="")
    image4=ImageField(blank=True, manual_crop="")
    image5=ImageField(blank=True, manual_crop="")
    location = models.PointField()
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    contact=models.IntegerField(null=True,blank=False)
    description=models.TextField(max_length=10000,null=False)
    opening = models.CharField(max_length=20, choices=Opening.choices,default="0800")
    closing = models.CharField(max_length=20, choices=Closing.choices,default="1800")
    category=models.CharField(max_length=1000,choices= HOUSE_CATEGORY)
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
    ("Botique","botique")
}
    class Opening(DjangoChoices):
        HOURS={
            ('0400','0400'),
            ('0500','0500'),
            ('0600','0600'),
            ('0700','0700'),
            ('0800','0800'),
            ('0900','0900'),
            ('1000','1000'),
            ('1100','1100'),
            ('1200','1200')
        }
        monday = ChoiceItem(choice=HOURS)
        tuesday = ChoiceItem(choice=HOURS)
        wenesday = ChoiceItem(choice=HOURS)
        thursday = ChoiceItem(choice=HOURS)
        friday = ChoiceItem(choice=HOURS)
        saturday = ChoiceItem(choice=HOURS)
        sunday = ChoiceItem(choice=HOURS)
    class Closing(DjangoChoices):
        HOURS={
            ('1400','1400'),
            ('1500','1500'),
            ('1600','1600'),
            ('1700','1700'),
            ('1800','1800'),
            ('1900','1900'),
            ('2000','2000')
        }
        monday = ChoiceItem(choice=HOURS)
        tuesday = ChoiceItem(choice=HOURS)
        wenesday = ChoiceItem(choice=HOURS)
        thursday = ChoiceItem(choice=HOURS)
        friday = ChoiceItem(choice=HOURS)
        saturday = ChoiceItem(choice=HOURS)
        sunday = ChoiceItem(choice=HOURS)
    name=models.CharField(max_length=20,null=False)
    location = models.PointField()
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
    opening = models.CharField(max_length=20, choices=Opening.choices,default="0800")
    closing = models.CharField(max_length=20, choices=Closing.choices,default="1800")
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
        business = cls.objects.filter(id=busines_id)
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
    ("Kibanda foods","kibanda foods")
}
    AVAILABLE={
    ("YES","yes"),
    ("NO","no")
    }
    class Opening(DjangoChoices):
        HOURS={
            ('0400','0400'),
            ('0500','0500'),
            ('0600','0600'),
            ('0700','0700'),
            ('0800','0800'),
            ('0900','0900'),
            ('1000','1000'),
            ('1100','1100'),
            ('1200','1200')
        }
        monday = ChoiceItem(choice=HOURS)
        tuesday = ChoiceItem(choice=HOURS)
        wenesday = ChoiceItem(choice=HOURS)
        thursday = ChoiceItem(choice=HOURS)
        friday = ChoiceItem(choice=HOURS)
        saturday = ChoiceItem(choice=HOURS)
        sunday = ChoiceItem(choice=HOURS)
    class Closing(DjangoChoices):
        HOURS={
            ('1400','1400'),
            ('1500','1500'),
            ('1600','1600'),
            ('1700','1700'),
            ('1800','1800'),
            ('1900','1900'),
            ('2000','2000')
        }
        monday = ChoiceItem(choice=HOURS)
        tuesday = ChoiceItem(choice=HOURS)
        wenesday = ChoiceItem(choice=HOURS)
        thursday = ChoiceItem(choice=HOURS)
        friday = ChoiceItem(choice=HOURS)
        saturday = ChoiceItem(choice=HOURS)
        sunday = ChoiceItem(choice=HOURS)
    name=models.CharField(max_length=20,null=False)
    location = models.PointField()
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
    opening = models.CharField(max_length=20, choices=Opening.choices,default="0800")
    closing = models.CharField(max_length=20, choices=Closing.choices,default="1800")
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
    