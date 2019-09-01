from django.conf.urls import url,include
from . import views
from django.conf.urls.static import static
from django.conf import settings
from .views import ServicesViewSet,BusinessViewSet,HousingViewSet

urlpatterns=[
    url('^$',views.housing,name = 'housing'),
    url('services/', ServicesViewSet.as_view({'get':'list','post':'create'}), name="sevices-all"),
    url('services/(?P<pk>\d+)/', ServicesViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name="sevices-all"),
    url('business/', BusinessViewSet.as_view({'get':'list','post':'create'}), name="business-all"),
    url('business/(?P<pk>\d+)/', BusinessViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name="business-all"),
    url('housing/', HousingViewSet.as_view({'get':'list','post':'create'}), name="housing-all"),
    url('housing/(?P<pk>\d+)/', HousingViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name="housing-all"),
    url(r'addhousing/$',views.addhousing,name = 'addhousing'),
    url(r'^services/$', views.services, name='services'),
    url(r'addservices/',views.addservices,name = 'addservices'),
    url(r'business/$',views.business,name='business'),
    url(r'addbusiness/',views.addbusiness,name = 'addbusiness'),
    
    ]