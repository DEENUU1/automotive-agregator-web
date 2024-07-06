from django.db import models


class Location(models.Model):
    COUNTRIES = (
        ("PL", "PL"),

    )

    city = models.CharField(max_length=50)
    region = models.CharField(max_length=50)
    country = models.CharField(max_length=10, choices=COUNTRIES)

    def __str__(self):
        return f"{self.country} - {self.region} - {self.city}"

    class Meta:
        db_table = 'location'
        verbose_name = 'Location'
        verbose_name_plural = 'Locations'
        ordering = ['country', 'region', 'city']
        unique_together = ('city', 'region')
