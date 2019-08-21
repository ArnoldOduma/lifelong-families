from django import forms
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from .models import Profile, Housing, Business, Comment,Services
from django.contrib.auth.models import User


# signup form adding custom field
class SignUpForm(UserCreationForm):
    """
    user creation form for sigup, adding custom field to signup form

    """
    email = forms.CharField(max_length=254, required=True)
    class Meta:
        model = User
        fields = ['username', 'useremail', 'userpassword', 'last_login']


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
    class Meta:
        model = Business
        fields = ['name','location','address','city','contact','description','category','verified']


class ServicesForm(forms.ModelForm):
    """
    for to create business
    """
    class Meta:
        model = Services
        fields = ['name','location','address','image','city','category','price','description','contact','available','verified']


class HousingForm(forms.ModelForm):
    """
    Form to Create Posts
    """
    class Meta:
        model = Housing
        fields = ['name','image','location','address','city','contact','description','verified']


class CommentForm(forms.ModelForm):
    """
    form t create comment
    """
    class Meta:
        model = Comment
        exclude = ['user', 'bsn','hsng','svc']
        fields = ['comment']