from rest_framework.generics import ListAPIView

from backend import settings
from offers.models.offer import Offer
from offers.serializers.offer_serializer import OfferOutputSerializer
from utils.custom_pagination import CustomPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.throttling import UserRateThrottle
from rest_framework.permissions import IsAuthenticated


class OfferListView(ListAPIView):
    queryset = Offer.objects.all()  # .filter(active=False)

    serializer_class = OfferOutputSerializer
    pagination_class = CustomPagination
    filter_backends = (DjangoFilterBackend, OrderingFilter, SearchFilter)
    throttle_classes = (UserRateThrottle,)
    permission_classes = (IsAuthenticated,)

    ordering_fields = [
        "created_at",
        "price__value",
        # "price__value_to"
    ]

    if settings.WORK_MODE == "PROD":
        search_fields = ["@title", "@description"]
    else:
        search_fields = ["title", "description"]

    # TODO add more filters
    filterset_fields = [
        "fuel_type",
        "gearbox",
        "category",
        "color",
        "car_body",
        "drive",
    ]

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
