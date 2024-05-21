from django.db import models
from django.utils import timezone
class mobile_sms(models.Model):
    username = models.CharField(max_length=20, default="user")
    phone = models.CharField(max_length=15, unique=True)
    sms = models.IntegerField(null=True)
    expiry = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.username


class CustomSession(models.Model):
    sessionID = models.CharField(max_length=2000)
    info = models.TextField()
    document = models.TextField()
    status = models.CharField(max_length=50, null=True, blank=True)


class RandomSession(models.Model):
    sessionID = models.CharField(max_length=2000)
    username = models.CharField(max_length=2000)
    status = models.CharField(max_length=50, null=True, blank=True)
    added = models.DateTimeField(default=timezone.now)