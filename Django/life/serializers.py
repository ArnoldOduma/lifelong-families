from rest_framework import serializers
from .models import Services,Business,Housing,Profile
from django.contrib.gis.db import models
import django_filters
from rest_framework_gis.serializers import GeoFeatureModelSerializer

class BusinessSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Business
        geo_field = "location"
        fields = ('id','name','owner_name','national_id','phone','email','postal_address','status','opening_days','opening','closing','address','country','county','city','town','village','location','description','company','image','image1','image2','image3','image4','image5','posting_date','category','verified','ratings')
    def create(self, validated_data):
        return Business.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get("id",instance.id)
        instance.name = validated_data.get("name",instance.name)
        instance.owner_name = validated_data.get("owner_name",instance.owner_name)
        instance.national_id = validated_data.get("national_id", instance.national_id)
        instance.phone = validated_data.get("phone", instance.phone)
        instance.email = validated_data.get("email", instance.email)
        instance.postal_address = validated_data.get("postal_address", instance.postal_address)
        instance.status = validated_data.get("status", instance.status)
        instance.opening_days = validated_data.get("opening_days", instance.opening_days)
        instance.opening = validated_data.get("opening", instance.opening)
        instance.closing = validated_data.get("closing", instance.closing)
        instance.address = validated_data.get("address", instance.address)
        instance.country = validated_data.get("country", instance.country)
        instance.county = validated_data.get("county", instance.county)
        instance.city = validated_data.get("city", instance.city)
        instance.town = validated_data.get("town", instance.town)
        instance.village = validated_data.get("village", instance.village)
        instance.location = validated_data.get("location", instance.location)
        instance.description = validated_data.get("description", instance.description)
        instance.company = validated_data.get("company", instance.company)
        instance.image = validated_data.get("image", instance.image)
        instance.image1 = validated_data.get("image1", instance.image1)
        instance.image2 = validated_data.get("image2", instance.image2)
        instance.image3 = validated_data.get("image3", instance.image3)
        instance.image4 = validated_data.get("image4", instance.image4)
        instance.image5 = validated_data.get("image5", instance.image5)
        instance.posting_date = validated_data.get("posting_date", instance.posting_date)
        instance.category = validated_data.get("category", instance.category)
        instance.verified = validated_data.get("verified", instance.verified)
        instance.ratings = validated_data.get("ratings", instance.ratings)
        instance.save()
        return instance

class ServicesSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Services
        geo_field = "location"
        fields = ('id','name','owner_name','national_id','phone','email','postal_address','status','opening_days','opening','closing','address','country','county','city','town','village','location','description','company','image','image1','image2','image3','image4','image5','posting_date','category','price','available','meeting','verified','ratings')
    def create(self, validated_data):
        return Services.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get("id",instance.id)
        instance.name = validated_data.get("name",instance.name)
        instance.owner_name = validated_data.get("owner_name",instance.owner_name)
        instance.national_id = validated_data.get("national_id", instance.national_id)
        instance.phone = validated_data.get("phone", instance.phone)
        instance.email = validated_data.get("email", instance.email)
        instance.postal_address = validated_data.get("postal_address", instance.postal_address)
        instance.status = validated_data.get("status", instance.status)
        instance.opening_days = validated_data.get("opening_days", instance.opening_days)
        instance.opening = validated_data.get("opening", instance.opening)
        instance.closing = validated_data.get("closing", instance.closing)
        instance.address = validated_data.get("address", instance.address)
        instance.country = validated_data.get("country", instance.country)
        instance.county = validated_data.get("county", instance.county)
        instance.city = validated_data.get("city", instance.city)
        instance.town = validated_data.get("town", instance.town)
        instance.village = validated_data.get("village", instance.village)
        instance.location = validated_data.get("location", instance.location)
        instance.description = validated_data.get("description", instance.description)
        instance.company = validated_data.get("company", instance.company)
        instance.image = validated_data.get("image", instance.image)
        instance.image1 = validated_data.get("image1", instance.image1)
        instance.image2 = validated_data.get("image2", instance.image2)
        instance.image3 = validated_data.get("image3", instance.image3)
        instance.image4 = validated_data.get("image4", instance.image4)
        instance.image5 = validated_data.get("image5", instance.image5)
        instance.posting_date = validated_data.get("posting_date", instance.posting_date)
        instance.category = validated_data.get("category", instance.category)
        instance.verified = validated_data.get("verified", instance.verified)
        instance.ratings = validated_data.get("ratings", instance.ratings)
        instance.save()
        return instance

            
class HousingSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Housing
        geo_field = "location"
        fields = ('id','name','owner_name','national_id','phone','email','postal_address','status','opening_days','opening','closing','address','country','county','city','town','village','location','description','company','image','image1','image2','image3','image4','image5','posting_date','size','firnished','unfirnished','amenities','price','mode_of_payment','category','verified','ratings')
    def create(self, validated_data):
        return Housing.objects.create(**validated_data)
 
    def update(self, instance, validated_data):
        instance.id = validated_data.get("id",instance.id)
        instance.name = validated_data.get("name",instance.name)
        instance.owner_name = validated_data.get("owner_name",instance.owner_name)
        instance.national_id = validated_data.get("national_id", instance.national_id)
        instance.phone = validated_data.get("phone", instance.phone)
        instance.email = validated_data.get("email", instance.email)
        instance.postal_address = validated_data.get("postal_address", instance.postal_address)
        instance.status = validated_data.get("status", instance.status)
        instance.opening_days = validated_data.get("opening_days", instance.opening_days)
        instance.opening = validated_data.get("opening", instance.opening)
        instance.closing = validated_data.get("closing", instance.closing)
        instance.address = validated_data.get("address", instance.address)
        instance.country = validated_data.get("country", instance.country)
        instance.county = validated_data.get("county", instance.county)
        instance.city = validated_data.get("city", instance.city)
        instance.town = validated_data.get("town", instance.town)
        instance.village = validated_data.get("village", instance.village)
        instance.location = validated_data.get("location", instance.location)
        instance.description = validated_data.get("description", instance.description)
        instance.company = validated_data.get("company", instance.company)
        instance.image = validated_data.get("image", instance.image)
        instance.image1 = validated_data.get("image1", instance.image1)
        instance.image2 = validated_data.get("image2", instance.image2)
        instance.image3 = validated_data.get("image3", instance.image3)
        instance.image4 = validated_data.get("image4", instance.image4)
        instance.image5 = validated_data.get("image5", instance.image5)
        instance.posting_date = validated_data.get("posting_date", instance.posting_date)
        instance.size = validated_data.get("size", instance.size)
        instance.firnished = validated_data.get("firnished", instance.firnished)
        instance.unfirnished = validated_data.get("unfirnished", instance.unfirnished)
        instance.amenities = validated_data.get("amenities", instance.amenities)
        instance.price = validated_data.get("price", instance.price)
        instance.mode_of_payment = validated_data.get("mode_of_payment", instance.mode_of_payment)
        instance.category = validated_data.get("category", instance.category)
        instance.price = validated_data.get("price", instance.price)
        instance.available = validated_data.get("available", instance.available)
        instance.meeting = validated_data.get("meeting", instance.meeting)
        instance.verified = validated_data.get("verified", instance.verified)
        instance.ratings = validated_data.get("ratings", instance.ratings)
        instance.save()
        return instance

        
class TokenSerializer(serializers.Serializer):
    """
    This serializer serializes the token data
    """
    token = serializers.CharField(max_length=255)
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("username", "email")