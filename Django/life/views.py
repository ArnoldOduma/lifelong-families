from django.shortcuts import render
# Create your views here.
from rest_framework import generics
from .models import Housing
from .serializers import HousingSerialiser
from rest_framework import viewsets

class HousingViewSet(viewsets.ModelViewSet):
   queryset = Housing.objects.all()
   serializer_class = HousingSerialiser