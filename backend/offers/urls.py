from django.urls import path
from offers.views.offer_post_bridge import OfferCreateBridgeAPIView
from offers.views.offer_list import OfferListView


urlpatterns = [
    path('bridge/', OfferCreateBridgeAPIView.as_view(), name='create-offers'),
    path('', OfferListView.as_view(), name='list-offers'),
]
