from django.shortcuts import render,HttpResponse
from geopy.geocoders import Nominatim
# Create your views here.
def Home(request):
    return HttpResponse("ok")
def country_city_name(latitude, longitude):
    geolocator = Nominatim(user_agent="geoapiExercises")
    Latitudes = latitude
    Longitudes = longitude
    loc = geolocator.reverse(Latitudes+","+Longitudes)
    address = loc.raw['address']
    city = address.get('city', '')
    country = address.get('country', '')
    return (country, city)


def get_html_msg(username, otp):
    return f'Dear {username}, <br> Please Enter below <strong>OTP</strong> to change password of dowell account <br><h2>Your OTP is <strong>{otp}</strong></h2><br>Note: This OTP is valid for the next 2 hours only.'
