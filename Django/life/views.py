from django.shortcuts import render
# Create your views here.
from rest_framework import generics
from .models import Services,Business,Housing
from .serializers import ServicesSerialiser,BusinessSerialiser,HousingSerialiser
from rest_framework import viewsets
from .forms import BusinessForm, ServicesForm, HousingForm
class ServicesViewSet(viewsets.ModelViewSet):

    queryset = Services.objects.all()
    serializer_class = ServicesSerialiser

class BusinessViewSet(viewsets.ModelViewSet):

    queryset = Business.objects.all()
    serializer_class = BusinessSerialiser
    
class HousingViewSet(viewsets.ModelViewSet):

    queryset = Housing.objects.all()
    serializer_class = HousingSerialiser
    
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