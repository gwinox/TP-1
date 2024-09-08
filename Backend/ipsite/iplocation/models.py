from django.db import models

class Coordinates(models.Model):
    query_date = models.DateTimeField("Date")
    lat1 = models.DecimalField(max_digits=10, decimal_places=4)
    lon1 = models.DecimalField(max_digits=10, decimal_places=4)
    lat2 = models.DecimalField(max_digits=10, decimal_places=4)
    lon2 = models.DecimalField(max_digits=10, decimal_places=4)
    lat3 = models.DecimalField(max_digits=10, decimal_places=4, null=True)
    lon3 = models.DecimalField(max_digits=10, decimal_places=4, null=True)
