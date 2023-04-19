from django import forms
import requests
from loginapp.models import Account,GuestAccount
from django.contrib.auth.forms import UserCreationForm

Role_CHOICES = (
    ('', 'Choose...'),
    ("User", "User"),
)

# r = requests.get(url='https://100074.pythonanywhere.com/countries/programmer/90000/100/')
# mylist=[]
# for a in r.json():
#     mytuple=("+"+a["country_code"],a["country_short"]+"(+"+a["country_code"]+")")
#     mylist.append(mytuple)

final=tuple([])
phone_CHOICES = final

class UserRegisterForm(UserCreationForm):
    username=forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Username'}))
    role=forms.ChoiceField(choices=Role_CHOICES,label="Your Designation")
    teamcode=forms.CharField(label='Team Code',widget=forms.TextInput(attrs={'placeholder': 'Team Code'}),required=False)
    email = forms.CharField(label='Eamil',widget=forms.TextInput(attrs={'placeholder': 'Email'}))
    password1 = forms.CharField(label='Password',widget=forms.PasswordInput(attrs={'placeholder':'Password','pattern':"(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$@!%^&*_]).{8,}", 'title':"Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"}))
    phone = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Phone'}),required=False)
    first_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'First Name'}))
    last_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Last Name'}),required=False)
    phonecode=forms.ChoiceField(label="Code",choices=phone_CHOICES)
    #profile_image=forms.ImageField(label="")
    password2=forms.CharField(label='Confirm Password',widget=forms.PasswordInput(attrs={'placeholder':'Password','pattern':"(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$@!%^&*_]).{8,}", 'title':"Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"}))

    class Meta:
        model = Account
        fields = ['username', 'email', 'phone','first_name','last_name','role','teamcode','password1', 'password2','phonecode','profile_image']