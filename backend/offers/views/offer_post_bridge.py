from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from offers.serializers.offer_serializer import OfferInputSerializer


class OfferCreateBridgeAPIView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = OfferInputSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
