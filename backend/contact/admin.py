from django.contrib import admin
from contact.models.contact import Contact


class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'email', 'subject', 'message')
    list_editable = ('read',)


admin.site.register(Contact, ContactAdmin)
