from typing import List

from offers.models import Location, Price, Offer
import logging

logger = logging.getLogger(__name__)


class OfferService:

    @staticmethod
    def create_offer(offer) -> Offer:
        location_data = offer.pop("location")
        price_data = offer.pop("price")

        location, created = Location.objects.get_or_create(
            city=location_data["city"],
            region=location_data["region"],
            country=location_data["country"],
            defaults=location_data,
        )

        price = Price.objects.create(**price_data)
        offer = Offer.objects.create(location=location, price=price, **offer)
        return offer

    def create_many_offers(self, validated_data) -> List[Offer]:
        offers = []
        for offer_data in validated_data:
            offer = self.create_offer(offer_data)
            offers.append(offer)
        return offers
