from django.contrib import admin

# Register your models here.
from . models import Account,GuestAccount,CustomSession,QR_Creation,RandomSession


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    pass

admin.site.register(GuestAccount)
admin.site.register(CustomSession)
admin.site.register(QR_Creation)
admin.site.register(RandomSession)