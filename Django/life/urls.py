from django.conf.urls import url,include
from . import views
from django.conf.urls.static import static
from django.conf import settings
# from rest_framework.authtoken.views import obtain_auth_token
from .views import ServicesViewSet,BusinessViewSet,HousingViewSet

urlpatterns=[
    url('^$',views.housing,name = 'housing'),
    url(r'^services/', views.services, name='services'),
    url(r'^business/',views.business,name='business'),
# To add data

    url(r'addhousing/',views.addhousing,name = 'addhousing'),
    url(r'addservices/',views.addservices,name = 'addservices'),
    url(r'addbusiness/',views.addbusiness,name = 'addbusiness'),

# To help in get request from the database by the user

    url('services/', ServicesViewSet.as_view()),
    url('business/', BusinessViewSet.as_view()),
    url('housing/', HousingViewSet.as_view()),
    
# To help in posting updating and deleting of data

    url('services/<int:pk>', ServicesViewSet.as_view()),
    url('business/<int:pk>', BusinessViewSet.as_view()),
    url('housing/<int:pk>', HousingViewSet.as_view()),
]