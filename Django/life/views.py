from django.shortcuts import render
# Create your views here.
from .models import Services,Business,Housing
from .forms import BusinessForm, ServicesForm, HousingForm
from .serializers import ServicesSerialiser,BusinessSerialiser,HousingSerialiser

from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import status
from rest_framework_jwt.settings import api_settings



class ServicesViewSet(viewsets.ModelViewSet):

    queryset = Services.objects.all()
    serializer_class = ServicesSerialiser
    
    def get(self, request, *args, **kwargs):
        try:
            a_request = self.queryset.get(pk=kwargs["pk"])
            return Response(RequestSerializer(a_request).data)
        except Requests.DoesNotExist:
            return Response(
                data={
                    "message": "Request with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )
            
    def put(self, request, *args, **kwargs):
        try:
            a_request = self.queryset.get(pk=kwargs["pk"])
            serializer = RequestSerializer()
            updated_request = serializer.update(a_request, request.data)
            return Response(RequestSerializer(updated_request).data)
        except Requests.DoesNotExist:
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
        except Requests.DoesNotExist:
            return Response(
                data={
                    "message": "Request with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )
            
class BusinessViewSet(viewsets.ModelViewSet):

    queryset = Business.objects.all()
    serializer_class = BusinessSerialiser
    
    def get(self, request, *args, **kwargs):
        try:
            a_request = self.queryset.get(pk=kwargs["pk"])
            return Response(RequestSerializer(a_request).data)
        except Requests.DoesNotExist:
            return Response(
                data={
                    "message": "Request with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )
            
    def put(self, request, *args, **kwargs):
        try:
            a_request = self.queryset.get(pk=kwargs["pk"])
            serializer = RequestSerializer()
            updated_request = serializer.update(a_request, request.data)
            return Response(RequestSerializer(updated_request).data)
        except Requests.DoesNotExist:
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
        except Requests.DoesNotExist:
            return Response(
                data={
                    "message": "Request with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )
            
class HousingViewSet(viewsets.ModelViewSet):

    queryset = Housing.objects.all()
    serializer_class = HousingSerialiser
    def get(self, request, *args, **kwargs):
        try:
            a_request = self.queryset.get(pk=kwargs["pk"])
            return Response(RequestSerializer(a_request).data)
        except Requests.DoesNotExist:
            return Response(
                data={
                    "message": "Request with id: {} does not exist".format(kwargs["pk"])
                },
                status=status.HTTP_404_NOT_FOUND
            )
            
    def put(self, request, *args, **kwargs):
        try:
            a_request = self.queryset.get(pk=kwargs["pk"])
            serializer = RequestSerializer()
            updated_request = serializer.update(a_request, request.data)
            return Response(RequestSerializer(updated_request).data)
        except Requests.DoesNotExist:
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
        except Requests.DoesNotExist:
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