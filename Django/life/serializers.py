from rest_framework import serializers
from .models import Services,Business,Housing

class BusinessSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Business
        fields = ('name','location','image','image1','image2','image3','image4','image5','address','city','contact','description','category','verified')
        
class ServicesSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Services
        fields = ('name','location','address','image','image1','image2','image3','image4','image5','city','category','price','description','contact','available','verified')

class HousingSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Housing
        fields = ('name','image','image1','image2','image3','image4','image5','location','address','city','contact','description','verified')