from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Services
from .serializers import ServicesSerialiser
from rest_framework import viewsets

class ServicesViewSet(viewsets.ModelViewSet):

    queryset = Services.objects.all()
    serializer_class = ServicesSerialiser