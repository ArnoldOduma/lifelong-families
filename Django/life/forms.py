from django import forms
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from .models import Profile, Housing, Business, Comments,Services
from django.contrib.auth.models import User
from django.contrib.gis import forms

# signup form adding custom field
class SignUpForm(UserCreationForm):
    """
    user creation form for sigup, adding custom field to signup form

    """
    email = forms.CharField(max_length=254, required=True)
    class Meta:
        model = User
        fields = ['username']


# Form for editing profile
class EditProfileForm(forms.ModelForm):
    """
    form for editing profile
    """
    class Meta:
        model = Profile
        fields = ['user', 'pic', 'bio']


class BusinessForm(forms.ModelForm):
    """
    form to create neighbourhood by users
    """
    location = forms.PointField(widget = 
        forms.OSMWidget(attrs = {'map_width': 1024, 'map_height': 600}))
    class Meta:
        model = Business
        fields = ['id','name','owner_name','national_id','phone','email','postal_address','status','opening_days','opening','closing','address','country','county','city','town','village','location','description','company','image','image1','image2','image3','image4','image5','category','verified']


class ServicesForm(forms.ModelForm):
    """
    for to create business
    """
    location = forms.PointField(widget = 
        forms.OSMWidget(attrs = {'map_width': 1024, 'map_height': 600}))
    class Meta:
        model = Services
        fields = ['id','name','owner_name','national_id','phone','email','postal_address','status','opening_days','opening','closing','address','country','county','city','town','village','location','description','company','image','image1','image2','image3','image4','image5','category','price','available','meeting_point','verified']


class HousingForm(forms.ModelForm):
    """
    Form to Create Posts
    """
    location = forms.PointField(widget = 
        forms.OSMWidget(attrs = {'map_width': 1024, 'map_height': 600}))
    class Meta:
        model = Housing
        fields = ['id','name','owner_name','national_id','phone','email','postal_address','status','opening_days','opening','closing','address','country','county','city','town','village','location','description','company','image','image1','image2','image3','image4','image5','size','firnished','unfirnished','amenities','price','mode_of_payment','category','verified']


class CommentForm(forms.ModelForm):
    """
    form t create comment
    """
    class Meta:
        model = Comments
        exclude = ['user', 'bsn','hsng','svc']
        fields = ['comment']