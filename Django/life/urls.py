from django.conf.urls import url,include
from . import views
from django.conf.urls.static import static
from django.conf import settings
from .views import ServicesViewSet,BusinessViewSet,HousingViewSet

urlpatterns=[
    url('^$',views.housing,name = 'housing'),
    url('services/', ServicesViewSet.as_view({'get':'list'}), name="sevices-all"),
    url('services/<int:pk>/', ServicesViewSet.as_view({'put','list'}), name="sevices-all"),
    url('business/', BusinessViewSet.as_view({'get':'list'}), name="business-all"),
    url('business/<int:pk>/', BusinessViewSet.as_view({'put':'list'}), name="business-all"),
    url('housing/', HousingViewSet.as_view({'get':'list'}), name="housing-all"),
    url('housing/<int:pk>/', HousingViewSet.as_view({'put':'list'}), name="housing-all"),
    url(r'addhousing/$',views.addhousing,name = 'addhousing'),
    url(r'^services/$', views.services, name='services'),
    url(r'addservices/',views.addservices,name = 'addservices'),
    url(r'business/$',views.business,name='business'),
    url(r'addbusiness/',views.addbusiness,name = 'addbusiness'),
    
    ]