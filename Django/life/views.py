from django.shortcuts import render
# Create your views here.
from rest_framework import generics
from .models import Services,Business,Housing
from .serializers import ServicesSerialiser,BusinessSerialiser,HousingSerialiser
from rest_framework import viewsets

class ServicesViewSet(viewsets.ModelViewSet):

    queryset = Services.objects.all()
    serializer_class = ServicesSerialiser

class BusinessViewSet(viewsets.ModelViewSet):

    queryset = Business.objects.all()
    serializer_class = BusinessSerialiser
    
class HousingViewSet(viewsets.ModelViewSet):

    queryset = Housing.objects.all()
    serializer_class = HousingSerialiser