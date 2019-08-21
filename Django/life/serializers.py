from rest_framework import serializers
from .models import Services


class ServicesSerialiser(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Services
        fields = ('name','location','address','image','city','category','price','description','contact','available','verified')