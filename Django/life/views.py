from django.shortcuts import render,redirect

# import the classes from the model
from .models import Services,Business,Housing,Comments

# import the forms from the form file
from .forms import BusinessForm, ServicesForm, HousingForm,CommentForm
from django.contrib.auth import login as auth_login
from django.contrib.auth.decorators import login_required
# import the class serializers from the serializer file
from .serializers import ServicesSerialiser,BusinessSerialiser,HousingSerialiser
from .permissions import IsAdminOrReadOnly
# Rest framework to help in creating of the api
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.views import status
from rest_framework_jwt.settings import api_settings
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
# from rest_framework_gis.filters import Filter
from rest_framework_gis.filters import InBBoxFilter

# Services view
def services(request):
    services=Services.objects.all()
    return render(request,'services.html',{'services':services})
def addservices(request):
    if request.method == 'POST':
        form = ServicesForm(request.POST, request.FILES)
        if form.is_valid():
            n = form.save(commit=False)
            n.admin = request.user
            request.user.save()
            n.save()
        return redirect('services')
    else:
        form = ServicesForm()
    return render(request,'addservices.html', {'form': form})
class ServicesViewSet(APIView):
    queryset = Services.objects.all()
    serializer_class = ServicesSerialiser
    filter_backends = [InBBoxFilter,DjangoFilterBackend]
    bbox_filter_field = 'location'
    bbox_filter_include_overlapping = True
    filterset_fields = ['id','category','city']
    permission_classes = (IsAdminOrReadOnly)
    def get(self, request, format=None):
        all_services = Services.objects.all()
        serializers = ServicesSerialiser(all_services, many=True)
        return Response(serializers.data)
    def post(self, request, format=None):
        serializers = ServicesSerialiser(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request):
        saved_services = Services.objects.all()
        data = request.data.get('id')
        serialiser = ServicesSerialiser(instance=saved_services, data=data, partial=True)
        if serialiser.is_valid(raise_exception=True):
            service_saved = serialiser.save()
        return Response({"success": "Service '{}' updated successfully".format(service_saved.id)})
    def delete(self, request):
        services = Services.objects.all()
        data = request.data.get('id')
        serialiser = ServicesSerialiser(instance=services, data=data)
        if serialiser.is_valid(raise_exception=True):
            services_deleted = serialiser.delete()
        return Response({"message": "Services with id `{}` has been deleted.".format(services_deleted.id)},status=204)
            
            # Business view
def business(request):
    business=Business.objects.all()
    return render(request,'business.html',{'business':business})
def addbusiness(request):
    if request.method == 'POST':
        form = BusinessForm(request.POST, request.FILES)
        if form.is_valid():
            n = form.save(commit=False)
            n.admin = request.user
            request.user.save()
            n.save()
        return redirect('business')
    else:
        form = BusinessForm()
    return render(request,'addbusiness.html', {'form': form})
class BusinessViewSet(APIView):
    queryset = Business.objects.all()
    serializer_class = BusinessSerialiser
    filter_backends = [InBBoxFilter,DjangoFilterBackend]
    bbox_filter_field = 'location'
    bbox_filter_include_overlapping = True
    filterset_fields = ['id','category','city']
    permission_classes = (IsAdminOrReadOnly) 
    def get(self, request, format=None):
        all_businesses = Business.objects.all()
        serializers = BusinessSerialiser(all_businesses, many=True)
        return Response(serializers.data)
    def post(self, request, format=None):
        serializers = BusinessSerialiser(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request):
        saved_businesses = Business.objects.all()
        data = request.data.get('id')
        serialiser = BusinessSerialiser(instance=saved_businesses, data=data, partial=True)
        if serialiser.is_valid(raise_exception=True):
            business_saved = serialiser.save()
        return Response({"success": "business '{}' updated successfully".format(business_saved.id)})
            
    def delete(self, request):
        business = Business.objects.all()
        data = request.data.get('id')
        serialiser = BusinessSerialiser(instance=business, data=data)
        if serialiser.is_valid(raise_exception=True):
            business_deleted = serialiser.delete()
        return Response({"message": "Business with id `{}` has been deleted.".format(business_deleted.id)},status=204)
            
            
            # Housing view
def housing(request):
    housing=Housing.objects.all()
    return render(request,'housing.html',{'housing':housing})
def addhousing(request):
    if request.method == 'POST':
        form = HousingForm(request.POST, request.FILES)
        if form.is_valid():
            n = form.save(commit=False)
            n.admin = request.user
            request.user.save()
            n.save()
        return redirect('housing')
    else:
        form = HousingForm()
    return render(request,'addhousing.html', {'form': form})
class HousingViewSet(APIView):
    queryset = Housing.objects.all()
    serializer_class = HousingSerialiser
    filter_backends = [InBBoxFilter,DjangoFilterBackend]
    bbox_filter_field = 'location'
    bbox_filter_include_overlapping = True
    filterset_fields = ['id','category','city']
    permission_classes = (IsAdminOrReadOnly) 
    def get(self, request, format=None):
        all_housing = Housing.objects.all()
        serializers = HousingSerialiser(all_housing, many=True)
        return Response(serializers.data)
    def post(self, request, format=None):
        serializers = HousingSerialiser(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data, status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request):
        saved_housing = Housing.objects.all()
        data = request.data.get('id')
        serialiser = HousingSerialiser(instance=saved_housing, data=data, partial=True)
        if serialiser.is_valid(raise_exception=True):
            housing_saved = serialiser.save()
        return Response({"success": "housing '{}' updated successfully".format(housing_saved.id)})
            
    def delete(self, request):
        housing = Housing.objects.all()
        data = request.data.get('id')
        serialiser = HousingSerialiser(instance=housing, data=data)
        if serialiser.is_valid(raise_exception=True):
            housing_deleted = serialiser.delete()
        return Response({"message": "Housing with id `{}` has been deleted.".format(housing_deleted.id)},status=204)

def comment(request):
    comment = Comments.objects.all()
    if request.method == 'POST':
        comment = CommentForm(request.POST)
        if comment.is_valid():
            comms = comment.save(commit=False)
            comms.user = request.user
            comms.save()
        return redirect(request,'comment.html',request.user)
def about(request):
    return render(request,'aboutus.html')