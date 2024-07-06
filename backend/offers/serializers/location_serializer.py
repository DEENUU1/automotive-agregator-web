from rest_framework.serializers import ModelSerializer
from offers.models.location import Location


class LocationInputSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = ["city", "region", "country"]


class LocationOutputSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = ["city", "region", "country", "id"]
