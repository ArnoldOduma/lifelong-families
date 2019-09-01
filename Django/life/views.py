from django.shortcuts import render,redirect
# Create your views here.
from .models import Services,Business,Housing
from .forms import BusinessForm, ServicesForm, HousingForm,CommentForm
from .serializers import ServicesSerialiser,BusinessSerialiser,HousingSerialiser

from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import status
from rest_framework_jwt.settings import api_settings
from rest_framework import permissions
from django_filters.rest_framework import DjangoFilterBackend
# from rest_framework_gis.filters import Filter
from rest_framework_gis.filters import InBBoxFilter

class ServicesViewSet(viewsets.ModelViewSet):

    queryset = Services.objects.all()
    serializer_class = ServicesSerialiser
    filter_backends = [InBBoxFilter,DjangoFilterBackend]
    bbox_filter_field = 'location'
    bbox_filter_include_overlapping = True
    filterset_fields = ['id','category','city']
    permission_classes = (permissions.AllowAny,)

    
    def get(self, request, *args, **kwargs):
        try:
            a_request = self.queryset.get(pk=kwargs["pk"])
            return Response(ServicesSerialiser(a_request).data)
        except Services.DoesNotExist:
            return Response(
                data={
                    "message": "Request with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )
    def post(self,request):
        serializer = ServicesSerialiser(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        try:
            a_request = self.queryset.get(pk=kwargs["pk"])
            serializer = ServicesSerialiser()
            updated_request = serializer.update(a_request, request.data)
            return Response(ServicesSerialiser(updated_request).data)
        except Services.DoesNotExist:
            return Response(
                data={
                    "message": "Request with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )
            
    def delete(self, request, *args, **kwargs):
        try:
            a_request = self.queryset.get(pk=kwargs["pk"])
            a_request.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Services.DoesNotExist:
            return Response(
                data={
                    "message": "Request with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )
            
class BusinessViewSet(viewsets.ModelViewSet):

    queryset = Business.objects.all()
    serializer_class = BusinessSerialiser
    filter_backends = [InBBoxFilter,DjangoFilterBackend]
    bbox_filter_field = 'location'
    bbox_filter_include_overlapping = True
    filterset_fields = ['id','category','city']
    permission_classes = (permissions.AllowAny,)
    def get(self, request, *args, **kwargs):
        try:
            a_request = self.queryset.get(pk=kwargs["pk"])
            return Response(BusinessSerialiser(a_request).data)
        except Business.DoesNotExist:
            return Response(
                data={
                    "message": "Request with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )
    def post(self,request):
        serializer = BusinessSerialiser(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, *args, **kwargs):
        try:
            a_request = self.queryset.get(pk=kwargs["pk"])
            serializer = BusinessSerialiser()
            updated_request = serializer.update(a_request, request.data)
            return Response(BusinessSerialiser(updated_request).data)
        except Business.DoesNotExist:
            return Response(
                data={
                    "message": "Request with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )
            
    def delete(self, request, *args, **kwargs):
        try:
            a_request = self.queryset.get(pk=kwargs["pk"])
            a_request.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Business.DoesNotExist:
            return Response(
                data={
                    "message": "Request with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )
            
class HousingViewSet(viewsets.ModelViewSet):

    queryset = Housing.objects.all()
    serializer_class = HousingSerialiser
    filter_backends = [InBBoxFilter,DjangoFilterBackend]
    bbox_filter_field = 'location'
    bbox_filter_include_overlapping = True
    filterset_fields = ['id','category','city']
    permission_classes = (permissions.AllowAny,)
    def get(self, request, *args, **kwargs):
        try:
            a_request = self.queryset.get(pk=kwargs["pk"])
            return Response(HousingSerialiser(a_request).data)
        except Housing.DoesNotExist:
            return Response(
                data={
                    "message": "Request with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )
    def post(self,request):
        serializer = HousingSerialiser(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, *args, **kwargs):
        try:
            a_request = self.queryset.get(pk=kwargs["pk"])
            serializer = HousingSerialiser()
            updated_request = serializer.update(a_request, request.data)
            return Response(HousingSerialiser(updated_request).data)
        except Housing.DoesNotExist:
            return Response(
                data={
                    "message": "Request with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )
            
    def delete(self, request, *args, **kwargs):
        try:
            a_request = self.queryset.get(pk=kwargs["pk"])
            a_request.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Housing.DoesNotExist:
            return Response(
                data={
                    "message": "Request with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )
            
def business(request):
    business=Business.objects.all()
    return render(request,'business.html',{'business':business})

def addbusiness(request):
    if request.method == 'POST':
        form = BusinessForm(request.POST, request.FILES)
        if form.is_valid():
            n = form.save(commit=False)
            n.admin = request.user.profile
            request.user.profile.save()
            n.save()
        return redirect('business')
    else:
        form = BusinessForm()
    return render(request,'addbusiness.html', {'form': form})


def housing(request):
    housing=Housing.objects.all()
    return render(request,'housing.html',{'housing':housing})
def addhousing(request):
    if request.method == 'POST':
        form = HousingForm(request.POST, request.FILES)
        if form.is_valid():
            n = form.save(commit=False)
            n.admin = request.user.profile
            request.user.profile.save()
            n.save()
        return redirect('housing')
    else:
        form = HousingForm()
    return render(request,'addhousing.html', {'form': form})


def services(request):
    services=Services.objects.all()
    return render(request,'services.html',{'services':services})
def addservices(request):
    if request.method == 'POST':
        form = ServicesForm(request.POST, request.FILES)
        if form.is_valid():
            n = form.save(commit=False)
            n.admin = request.user.profile
            request.user.profile.save()
            n.save()
        return redirect('services')
    else:
        form = ServicesForm()
    return render(request,'addservices.html', {'form': form})

def comment(request):
    if request.method == 'POST':
        comment = CommentForm(request.POST)
        if comment.is_valid():
            comms = comment.save(commit=False)
            comms.user = request.user
            comms.save()
        return redirect('services','business','housing', request.user.profile)
def about(request):
    return render(request,'aboutus.html')