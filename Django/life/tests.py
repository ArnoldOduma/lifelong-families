from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from .models import Services,Business,Housing
from .serializers import ServicesSerializer

# tests for views


class ServicesViewTest(APITestCase):
    client = APIClient()

    @staticmethod
    def create_services(name="", location="",address="",image="",image1="",image2="",image3="",image4="",image5="",city="",category="",price="",description="",contact="",available="",verified=""):
        if name != "" and location != "" and address !="" and image !="" and image1 !="" and image2 !="" and image3 !="" and image4 !="" and image5 !=""and city !="" and category !="" and price !="" and description !="" and contact !="" and available !="" and verified !="":
            Services.objects.create(name=name, location=location,address=address,image=image,city=city,category=category,price=price,description=description,contact=contact,available=available,verified=verified)

    def setUp(self):
        # add test data
        self.create_services("John me", "kayole","7-00902","john","side1","side2","side3","side4","side5","Nairobi","Plumbing","500","The best in town no flooding waters anymore","0728394737","yes","yes")


class GetAllServicesTest(ServicesViewTest):

    def test_get_all_services(self):
        """
        This test ensures that all services added in the setUp method
        exist when we make a GET request to the services/ endpoint
        """
        # hit the API endpoint
        response = self.client.get(
            reverse("services-all", kwargs={"version": "v1"})
        )
        # fetch the data from db
class BusinessViewTest(APITestCase):
    client = APIClient()

    @staticmethod
    def create_business(name="", location="",address="",image="",image1="",image2="",image3="",image4="",image5="",city="",category="",description="",contact="",verified=""):
        if name != "" and location != "" and address !="" and image !="" and image1 !="" and image2 !="" and image3 !="" and image4 !="" and image5 !="" and city !="" and category !="" and description !="" and contact !="" and verified !="":
            Business.objects.create(name=name, location=location,address=address,image=image,city=city,category=category,description=description,contact=contact,verified=verified)

    def setUp(self):
        # add test data
        self.create_business("Tony Ent", "Adams","7-00902","stuffs","2","3","4","5","6","7","Nairobi","Elactric Hardware","This is where you get to sun up your room","0728394737","yes")


class GetAllBusinessTest(BusinessViewTest):

    def test_get_all_business(self):
        """
        This test ensures that all services added in the setUp method
        exist when we make a GET request to the business/ endpoint
        """
        # hit the API endpoint
        response = self.client.get(
            reverse("business-all", kwargs={"version": "v1"})
        )
        # fetch the data from db

class HousingViewTest(APITestCase):
    client = APIClient()

    @staticmethod
    def create_housing(name="", location="",address="",image="",image1="",image2="",image3="",image4="",image5="",city="",category="",description="",contact="",verified=""):
        if name != "" and location != "" and address !="" and image !="" and image1 !="" and image2 !="" and image3 !="" and image4 !="" and image5 !=""and city !="" and category !="" and description !="" and contact !="" and verified !="":
            Housing.objects.create(name=name, location=location,address=address,image=image,city=city,category=category,description=description,contact=contact,verified=verified)

    def setUp(self):
        # add test data
        self.create_housing("Gaminton", "Adams","7-00902","rooms","front","back","side1","side2","top","Nairobi","Appartment","All the rooms are as you want them","0728394737","yes")


class GetAllHousingTest(HousingViewTest):

    def test_get_all_housing(self):
        """
        This test ensures that all housing added in the setUp method
        exist when we make a GET request to the housing/ endpoint
        """
        # hit the API endpoint
        response = self.client.get(
            reverse("housing-all", kwargs={"version": "v1"})
        )
        # fetch the data from db