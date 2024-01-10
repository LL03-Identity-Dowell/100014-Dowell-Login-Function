from django.contrib import admin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.contrib.auth.admin import UserAdmin
# Register your models here.
from . models import Account, GuestAccount, CustomSession, QR_Creation, RandomSession, Linkbased_RandomSession, Location_check, mobile_sms, Face_Login


@admin.register(Account)
class AccountAdmin(UserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ['username', 'is_admin']
    list_filter = ['is_admin']
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal info', {'fields': ('profile_image', 'first_name', 'last_name', 'phonecode', 'phone', 'profile_id', 'client_admin_id', 'policy_status', 'user_type', 'event_id', 'payment_status', 'safty_secruity_policy', 'country', 'newsletter_subscription'),}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2')}
        ),
    )
    
    search_fields = ['username']
    ordering = ['username']
    filter_horizontal = ()


@admin.register(Location_check)
class Locatuib_checkAdmin(admin.ModelAdmin):
    pass

class mobile_smsAdmin(admin.ModelAdmin):
    list_display=('phone', 'username', 'sms', 'expiry')
    search_fields=['phone']

class RandomSessionAdmin(admin.ModelAdmin):
    list_display=('sessionID', 'username', 'status', 'added')
    search_fields=['username','sessionID']

admin.site.register(GuestAccount)
admin.site.register(CustomSession)
admin.site.register(QR_Creation)
admin.site.register(RandomSession,RandomSessionAdmin)
admin.site.register(Linkbased_RandomSession)
admin.site.register(mobile_sms,mobile_smsAdmin)
admin.site.register(Face_Login)