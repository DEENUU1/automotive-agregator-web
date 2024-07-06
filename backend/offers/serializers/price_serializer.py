from rest_framework.serializers import ModelSerializer
from offers.models.price import Price


class PriceInputSerializer(ModelSerializer):
    class Meta:
        model = Price
        fields = ["value", "currency"]


class PriceOutputSerializer(ModelSerializer):
    class Meta:
        model = Price
        fields = ["value", "currency", "id"]
