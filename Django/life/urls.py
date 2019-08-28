from django.conf.urls import url
from . import views
from django.conf.urls.static import static
from django.conf import settings
from .views import HousingViewSet

urlpatterns=[
   url('housing/', HousingViewSet.as_view({'get':'list'}), name="housing-all"),
]