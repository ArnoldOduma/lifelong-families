from django.db import models
from django.contrib.gis.db import models
from django.contrib.auth.models import User
from pyuploadcare.dj.models import ImageField
# Create your models here.
class User(models.Model):
    is_authenticated = True
    username = models.CharField(max_length =50)
    useremail = models.CharField(max_length = 140)
    userpassword = models.CharField(max_length = 100)
    last_login = models.DateField(auto_now=True)
    profilepic = ImageField(blank=True, manual_crop="")
class Profile(models.Model):
    user = models.OneToOneField(User,max_length=30,null=False)
    pic = ImageField(blank=True, manual_crop="")
    bio = models.CharField(default="Hi!", max_length = 30)
    
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
    name=models.CharField(max_length=20,null=False)
    image=ImageField(blank=True, manual_crop="")
    location = models.PointField()
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    contact=models.IntegerField(null=True,blank=False)
    description=models.TextField(max_length=10000,null=False)
    category=models.CharField(max_length=1000,choices= HOUSE_CATEGORY)
    verified=models.BooleanField(null=False,blank=False)
    def save_image(self):
        self.save()
    def delete_image(self,cls):
        cls.objects.get(id = self.id).delete()
    def update_posted_by(self,new_posted_by,new_caption):
        self.posted_by = new_caption
        self.save()
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
    name=models.CharField(max_length=20,null=False)
    location = models.PointField()
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    image=ImageField(blank=True, manual_crop="")
    contact=models.IntegerField(null=True,blank=False)
    description=models.TextField(max_length=10000,null=False)
    category=models.CharField(max_length=1000,choices= BUSINESS_CATEGORY)
    verified=models.BooleanField(null=False,blank=False)
    def save_image(self):
        self.save()
    def delete_image(self,cls):
        cls.objects.get(id = self.id).delete()
    def update_posted_by(self,new_posted_by,new_caption):
        self.posted_by = new_caption
        self.save()
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
    name=models.CharField(max_length=20,null=False)
    location = models.PointField()
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    image=ImageField(blank=True, manual_crop="")
    category=models.CharField(max_length=1000,choices= SERVICE_CATEGORY)
    price =models.IntegerField(null=True,blank=False)
    description=models.TextField(max_length=10000,null=False)
    contact=models.IntegerField(null=True,blank=False)
    available=models.CharField(max_length=1000,choices= AVAILABLE)
    verified=models.BooleanField(null=False,blank=False)
    def save_image(self):
        self.save()
    def delete_image(self,cls):
        cls.objects.get(id = self.id).delete()
    def update_posted_by(self,new_posted_by,new_caption):
        self.posted_by = new_caption
        self.save()
class Comments(models.Model):
    user=models.ForeignKey(User,max_length=30,)



