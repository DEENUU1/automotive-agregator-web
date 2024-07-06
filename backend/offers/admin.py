from django.contrib import admin
from offers.models.price import Price
from offers.models.location import Location
from offers.models.offer import Offer


class PriceAdmin(admin.ModelAdmin):
    list_display = ('value', 'currency')
    list_filter = ('currency',)


class LocationAdmin(admin.ModelAdmin):
    list_display = ('city', 'country', 'region')
    list_filter = ('country',)


class OfferAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'price', 'category', 'source', 'active')
    list_filter = ('location', 'category')
    list_editable = ('active',)
    search_fields = ('title', 'description')
    readonly_fields = ('created_at', 'updated_at')


admin.site.register(Price, PriceAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Offer, OfferAdmin)
