from django.conf.urls import url,include
from . import views
from django.conf.urls.static import static
from django.conf import settings
from .views import ServicesViewSet,BusinessViewSet,HousingViewSet
urlpatterns=[
    url('services/', ServicesViewSet.as_view({'get':'list'}), name="sevices-all"),
    url('business/', BusinessViewSet.as_view({'get':'list'}), name="business-all"),
    url('housing/', HousingViewSet.as_view({'get':'list'}), name="housing-all")
    ]