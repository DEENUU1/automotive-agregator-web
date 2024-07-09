from rest_framework.generics import RetrieveAPIView

from offers.models.offer import Offer
from offers.serializers.offer_serializer import OfferOutputSerializer
from rest_framework.throttling import UserRateThrottle
from rest_framework.permissions import IsAuthenticated


class OfferDetailView(RetrieveAPIView):
    lookup_field = "pk"
    queryset = Offer.objects.filter(active=False)
    # TODO change 'active' to True
    serializer_class = OfferOutputSerializer
    throttle_classes = (UserRateThrottle,)
    permission_classes = (IsAuthenticated,)

