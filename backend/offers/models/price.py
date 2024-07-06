from django.db import models


class Price(models.Model):
    CURRENCIES = (
        ("PLN", "PLN"),
        ("USD", "USD"),
    )
    value = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=5, choices=CURRENCIES, default="PLN")

    def __str__(self):
        return f"{self.value} {self.currency}"

    class Meta:
        db_table = 'price'
        verbose_name = 'Price'
        verbose_name_plural = 'Prices'
        ordering = ['value']
