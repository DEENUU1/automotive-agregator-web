# Generated by Django 5.0.6 on 2024-07-06 14:28

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("offers", "0002_offer_active_alter_offer_id"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="location",
            unique_together=set(),
        ),
    ]
