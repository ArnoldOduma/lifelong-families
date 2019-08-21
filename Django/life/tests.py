from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework.views import status
from .models import Services
from .serializers import ServicesSerializer

# tests for views


class ServicesViewTest(APITestCase):
    client = APIClient()

    @staticmethod
    def create_services(name="", location="",address="",image="",city="",category="",price="",description="",contact="",available="",verified=""):
        if name != "" and location != "" and address !="" and image !="" and city !="" and category !="" and price !="" and description !="" and contact !="" and available !="" and verified !="":
            Services.objects.create(name=name, location=location,address=address,image=image,city=city,category=category,price=price,description=description,contact=contact,available=available,verified=verified)

    def setUp(self):
        # add test data
        self.create_services("John me", "kayole","7-00902","john","Nairobi","Plumbing","500","The best in town no flooding waters anymore","0728394737","yes","yes")


class GetAllServicesTest(ServicesViewTest):

    def test_get_all_servicess(self):
        """
        This test ensures that all services added in the setUp method
        exist when we make a GET request to the services/ endpoint
        """
        # hit the API endpoint
        response = self.client.get(
            reverse("services-all", kwargs={"version": "v1"})
        )
        # fetch the data from db