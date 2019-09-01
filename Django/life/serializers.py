from rest_framework import serializers
from .models import Services,Business,Housing
from django.contrib.gis.db import models
import django_filters
from rest_framework_gis.serializers import GeoFeatureModelSerializer

class BusinessSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Business
        geo_field = "location"
        fields = ('id','owner_name','name','location','image','image1','image2','image3','image4','image5','address','city','contact','description','category','verified')
        
    def update(self, instance, validated_data):
        instance.id = validated_data.get("id",instance.id)
        instance.owner_name = validated_data.get("owner_name",instance.owner_name)
        instance.name = validated_data.get("name", instance.name)
        instance.location = validated_data.get("location", instance.location)
        instance.image = validated_data.get("image", instance.image)
        instance.image1 = validated_data.get("image1", instance.image1)
        instance.image2 = validated_data.get("image2", instance.image2)
        instance.image3 = validated_data.get("image3", instance.image3)
        instance.image4 = validated_data.get("image4", instance.image4)
        instance.image5 = validated_data.get("image5", instance.image5)
        instance.address = validated_data.get("address", instance.address)
        instance.city = validated_data.get("city", instance.city)
        instance.contact = validated_data.get("contact", instance.contact)
        instance.description = validated_data.get("description", instance.description)
        instance.category = validated_data.get("category", instance.category)
        instance.verified = validated_data.get("verified", instance.verified)
        instance.save()
        return instance

class ServicesSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Services
        geo_field = "location"
        fields = ('id','owner_name','name','location','address','image','image1','image2','image3','image4','image5','city','category','price','description','contact','available','verified')

    def update(self, instance, validated_data):
        instance.id = validated_data.get("id",instance.id)
        instance.owner_name = validated_data.get("owner_name",instance.owner_name)
        instance.name = validated_data.get("name", instance.name)
        instance.location = validated_data.get("location", instance.location)
        instance.address = validated_data.get("address", instance.address)
        instance.image = validated_data.get("image", instance.image)
        instance.image1 = validated_data.get("image1", instance.image1)
        instance.image2 = validated_data.get("image2", instance.image2)
        instance.image3 = validated_data.get("image3", instance.image3)
        instance.image4 = validated_data.get("image4", instance.image4)
        instance.image5 = validated_data.get("image5", instance.image5)
        instance.city = validated_data.get("city", instance.city)
        instance.category = validated_data.get("category", instance.category)
        instance.price = validated_data.get("price", instance.price)
        instance.description = validated_data.get("description", instance.description)
        instance.contact = validated_data.get("contact", instance.contact)
        instance.available = validated_data.get("available", instance.available)
        instance.verified = validated_data.get("verified", instance.verified)
        instance.save()
        return instance

            
class HousingSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Housing
        geo_field = "location"
        fields = ('id','owner_name','location','name','image','image1','image2','image3','image4','image5','address','city','contact','description','verified')
        
    def update(self, instance, validated_data):
        instance.id = validated_data.get("id",instance.id)
        instance.owner_name = validated_data.get("owner_name",instance.owner_name)
        instance.name = validated_data.get("name", instance.name)
        instance.image = validated_data.get("image", instance.image)
        instance.image1 = validated_data.get("image1", instance.image1)
        instance.image2 = validated_data.get("image2", instance.image2)
        instance.image3 = validated_data.get("image3", instance.image3)
        instance.image4 = validated_data.get("image4", instance.image4)
        instance.image5 = validated_data.get("image5", instance.image5)
        instance.location = validated_data.get("location", instance.location)
        instance.address = validated_data.get("address", instance.address)
        instance.city = validated_data.get("city", instance.city)
        instance.contact = validated_data.get("contact", instance.contact)
        instance.description = validated_data.get("description", instance.description)
        instance.verified = validated_data.get("verified", instance.verified) 
        instance.save()
        return instance

        
class TokenSerializer(serializers.Serializer):
    """
    This serializer serializes the token data
    """
    token = serializers.CharField(max_length=255)
    
# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ("username", "email")