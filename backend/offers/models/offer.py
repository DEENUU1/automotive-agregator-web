import uuid

from django.db import models
from utils.base_model import BaseModel
from offers.models.price import Price
from offers.models.location import Location


class Offer(BaseModel):
    FUEL_TYPES = (
        ("lpg", "lpg"),
        ("plugin-hybrid", "plugin-hybrid"),
        ("petrol", "petrol"),
        ("electric", "electric"),
        ("cng", "cng"),
        ("diesel", "diesel")
    )
    GEARBOX_TYPES = (
        ("manual", "manual"),
        ("automatic", "automatic"),
    )
    CATEGORIES = (
        ("osobowe", "osobowe"),
        ("motocykle-i-quady", "motocykle-quady"),
        ("dostawcze", "dostawcze"),
        ("ciezarowe", "ciezarowe"),
        ("maszyny-budowlane", "maszyny-budowlane"),
        ("przyczepy",  "przyczepy"),
        ("maszyny-rolnicze", "maszyny-rolnicze"),
    )
    CAR_BODY = (
        ("minibus", "minibus"),
        ("pickup", "puckup"),
        ("coupe", "coupe"),
        ("estate-car", "estate-car"),
        ("hatchback", "hatchback"),
        ("mvp", "mvp"),
        ("suv", "suv"),
        ("suv", "suv"),
        ("off-road-vehicle", "off-road-vehicle"),
        ("cabriolet", "cabriolet")
    )
    COLORS = (
        ("srebrny", "srebrny"),
        ("brazowy_bezowy", "brazowy_bezowy"),
        ("inny", "inny"),
        ("bialy", "bialy"),
        ("niebieski", "niebieski"),
        ("szary", "szary"),
        ("czerwony", "czerwony"),
        ("zolty_zloty", "zolty_zloty"),
        ("zielony", "zielony")
    )
    CONDITIONS = (
        ("damaged", "damaged"),
        ("notdamaged", "notdamaged")
    )
    DRIVE = (
        ("all-wheel-lock", "all-wheel-lock"),
        ("front-wheel", "front-wheel"),
        ("all-wheel-auto", "all-wheel-auto"),
        ("rear-wheel", "read-wheel"),
        ("all-wheel-permanent", "all-wheel-permanent")
    )
    SOURCES = (
        ("olx", "olx"),
        ("otomoto", "otomoto")
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    offer_url = models.URLField(max_length=500)
    image_url = models.URLField(max_length=500, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    vin = models.CharField(max_length=20, null=True, blank=True)
    mileage = models.IntegerField(null=True, blank=True)
    fuel_type = models.CharField(max_length=20, choices=FUEL_TYPES, null=True, blank=True)
    gearbox = models.CharField(max_length=20, choices=GEARBOX_TYPES, null=True, blank=True)
    production_year = models.IntegerField(null=True, blank=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='offer')
    publication_time = models.CharField(max_length=20, null=True, blank=True)
    price = models.ForeignKey(Price, on_delete=models.CASCADE, related_name='offer', null=True, blank=True)
    category = models.CharField(max_length=30, choices=CATEGORIES)
    engine_size = models.IntegerField(null=True, blank=True)
    engine_power = models.IntegerField(null=True, blank=True)
    car_body = models.CharField(max_length=30, choices=CAR_BODY, null=True, blank=True)
    color = models.CharField(max_length=30, choices=COLORS, null=True, blank=True)
    condition = models.CharField(max_length=20, choices=CONDITIONS, null=True, blank=True)
    drive = models.CharField(max_length=30, choices=DRIVE, null=True, blank=True)
    source = models.CharField(max_length=30, choices=SOURCES)
    active = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'offer'
        verbose_name = 'Offer'
        verbose_name_plural = 'Offers'
        ordering = ['created_at']
