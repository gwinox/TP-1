from django.db import models

class IpLocation(models.Model):
    input_data = models.CharField(max_length=50)
    query_date = models.DateTimeField(auto_now_add=True)
    lat1 = models.DecimalField(max_digits=10, decimal_places=4)
    lon1 = models.DecimalField(max_digits=10, decimal_places=4)
    lat2 = models.DecimalField(max_digits=10, decimal_places=4)
    lon2 = models.DecimalField(max_digits=10, decimal_places=4)
    lat3 = models.DecimalField(max_digits=10, decimal_places=4, null=True)
    lon3 = models.DecimalField(max_digits=10, decimal_places=4, null=True)
    
    def __str__(self):
        return self.input_data