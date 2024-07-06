from django.forms import DateTimeField
from rest_framework.serializers import ModelSerializer
from offers.models.offer import Offer
from offers.serializers.location_serializer import LocationInputSerializer, LocationOutputSerializer
from offers.serializers.price_serializer import PriceOutputSerializer, PriceInputSerializer


class OfferInputSerializer(ModelSerializer):
    location = LocationInputSerializer()
    price = PriceInputSerializer()

    class Meta:
        model = Offer
        fields = [
            "title",
            "offer_url",
            "image_url",
            "description",
            "vin",
            "mileage",
            "fuel_type",
            "gearbox",
            "production_year",
            "location",
            "publication_time",
            "price",
            "category",
            "engine_size",
            "engine_power",
            "car_body",
            "color",
            "condition",
            "drive",
        ]


class OfferOutputSerializer(ModelSerializer):
    created_at = DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)
    updated_at = DateTimeField(format="%Y-%m-%d %H:%M:%S", read_only=True)

    location = LocationOutputSerializer()
    price = PriceOutputSerializer()

    class Meta:
        model = Offer
        fields = [
            "id"
            "title",
            "offer_url",
            "image_url",
            "description",
            "vin",
            "mileage",
            "fuel_type",
            "gearbox",
            "production_year",
            "location",
            "publication_time",
            "price",
            "category",
            "engine_size",
            "engine_power",
            "car_body",
            "color",
            "condition",
            "drive",
            "created_at",
            "updated_at"
        ]
