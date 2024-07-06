from django.urls import path
from offers.views.offer_post_bridge import OfferCreateBridgeAPIView


urlpatterns = [
    path('', OfferCreateBridgeAPIView.as_view(), name='create-offers'),
]
