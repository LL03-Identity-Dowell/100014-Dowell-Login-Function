from django.contrib import admin
from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth.admin import UserAdmin
from . forms import AccountAdminCreationForm
# Register your models here.
from . models import Account, GuestAccount, CustomSession, QR_Creation, RandomSession, Linkbased_RandomSession, Location_check, mobile_sms

@admin.register(Account)
class AccountAdmin(UserAdmin):
    form = UserChangeForm
    add_form = AccountAdminCreationForm

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
class Location_checkAdmin(admin.ModelAdmin):
    pass


admin.site.register(GuestAccount)
admin.site.register(CustomSession)
admin.site.register(QR_Creation)
admin.site.register(RandomSession)
admin.site.register(Linkbased_RandomSession)
admin.site.register(mobile_sms)
