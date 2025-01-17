# Generated by Django 5.0.6 on 2024-07-06 11:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Price",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("value", models.DecimalField(decimal_places=2, max_digits=10)),
                (
                    "currency",
                    models.CharField(
                        choices=[("PLN", "PLN"), ("USD", "USD")],
                        default="PLN",
                        max_length=5,
                    ),
                ),
            ],
            options={
                "verbose_name": "Price",
                "verbose_name_plural": "Prices",
                "db_table": "price",
                "ordering": ["value"],
            },
        ),
        migrations.CreateModel(
            name="Location",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("city", models.CharField(max_length=50)),
                ("region", models.CharField(max_length=50)),
                ("country", models.CharField(choices=[("PL", "PL")], max_length=10)),
            ],
            options={
                "verbose_name": "Location",
                "verbose_name_plural": "Locations",
                "db_table": "location",
                "ordering": ["country", "region", "city"],
                "unique_together": {("city", "region")},
            },
        ),
        migrations.CreateModel(
            name="Offer",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("title", models.CharField(max_length=100)),
                ("offer_url", models.URLField(max_length=500)),
                ("image_url", models.URLField(blank=True, max_length=500, null=True)),
                ("description", models.TextField(blank=True, null=True)),
                ("vin", models.CharField(blank=True, max_length=20, null=True)),
                ("mileage", models.IntegerField(blank=True, null=True)),
                (
                    "fuel_type",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("lpg", "lpg"),
                            ("plugin-hybrid", "plugin-hybrid"),
                            ("petrol", "petrol"),
                            ("electric", "electric"),
                            ("cng", "cng"),
                            ("diesel", "diesel"),
                        ],
                        max_length=20,
                        null=True,
                    ),
                ),
                (
                    "gearbox",
                    models.CharField(
                        blank=True,
                        choices=[("manual", "manual"), ("automatic", "automatic")],
                        max_length=20,
                        null=True,
                    ),
                ),
                ("production_year", models.IntegerField(blank=True, null=True)),
                (
                    "publication_time",
                    models.CharField(blank=True, max_length=20, null=True),
                ),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("osobowe", "osobowe"),
                            ("motocykle-i-quady", "motocykle-quady"),
                            ("dostawcze", "dostawcze"),
                            ("ciezarowe", "ciezarowe"),
                            ("maszyny-budowlane", "maszyny-budowlane"),
                            ("przyczepy", "przyczepy"),
                            ("maszyny-rolnicze", "maszyny-rolnicze"),
                        ],
                        max_length=30,
                    ),
                ),
                ("engine_size", models.IntegerField(blank=True, null=True)),
                ("engine_power", models.IntegerField(blank=True, null=True)),
                (
                    "car_body",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("minibus", "minibus"),
                            ("pickup", "puckup"),
                            ("coupe", "coupe"),
                            ("estate-car", "estate-car"),
                            ("hatchback", "hatchback"),
                            ("mvp", "mvp"),
                            ("suv", "suv"),
                            ("suv", "suv"),
                            ("off-road-vehicle", "off-road-vehicle"),
                            ("cabriolet", "cabriolet"),
                        ],
                        max_length=30,
                        null=True,
                    ),
                ),
                (
                    "color",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("srebrny", "srebrny"),
                            ("brazowy_bezowy", "brazowy_bezowy"),
                            ("inny", "inny"),
                            ("bialy", "bialy"),
                            ("niebieski", "niebieski"),
                            ("szary", "szary"),
                            ("czerwony", "czerwony"),
                            ("zolty_zloty", "zolty_zloty"),
                            ("zielony", "zielony"),
                        ],
                        max_length=30,
                        null=True,
                    ),
                ),
                (
                    "condition",
                    models.CharField(
                        blank=True,
                        choices=[("damaged", "damaged"), ("notdamaged", "notdamaged")],
                        max_length=20,
                        null=True,
                    ),
                ),
                (
                    "drive",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("all-wheel-lock", "all-wheel-lock"),
                            ("front-wheel", "front-wheel"),
                            ("all-wheel-auto", "all-wheel-auto"),
                            ("rear-wheel", "read-wheel"),
                            ("all-wheel-permanent", "all-wheel-permanent"),
                        ],
                        max_length=30,
                        null=True,
                    ),
                ),
                (
                    "location",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="offer",
                        to="offers.location",
                    ),
                ),
                (
                    "price",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="offer",
                        to="offers.price",
                    ),
                ),
            ],
            options={
                "verbose_name": "Offer",
                "verbose_name_plural": "Offers",
                "db_table": "offer",
                "ordering": ["created_at"],
            },
        ),
    ]
