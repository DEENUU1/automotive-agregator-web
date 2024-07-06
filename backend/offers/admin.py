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
    list_display = ('title', 'location', 'price', 'category')
    list_filter = ('location', 'category')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at', 'updated_at')
