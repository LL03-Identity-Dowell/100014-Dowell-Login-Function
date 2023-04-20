from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.utils.crypto import get_random_string

def get_profile_image_path(self,filename):
    return f'profile_images/{"profile_image.jpg"}'

def get_default_profile_image():
    return 'user.png'

class Account(AbstractUser):
    role = models.CharField(max_length = 300,default="User")
    datatype = models.CharField(max_length = 100,default="Testing")
    profile_image = models.ImageField(max_length=255,upload_to = get_profile_image_path, null = True, blank = True,default = get_default_profile_image)
    teamcode = models.CharField(max_length=20,null=True)
    phonecode = models.CharField(max_length=20,null=True)
    phone = models.CharField(max_length=20,null=True)
    current_task = models.CharField(max_length=200,null=True)

    def __str__(self):
        return self.teamcode

class GuestAccount(models.Model):
    username = models.CharField(max_length=20,unique=True)
    email = models.CharField(max_length=30,unique=True)
    is_activated = models.BooleanField(default=False)
    otp = models.IntegerField(null=True)
    token = models.CharField(max_length=300,null=True)
    expiry = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.username

    class Meta:
        db_table = "GuestAccount"

class mobile_sms(models.Model):
    username = models.CharField(max_length=20,default="user")
    phone = models.CharField(max_length=15,unique=True)
    sms = models.IntegerField(null=True)
    expiry = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.username