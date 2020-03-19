from django.db import models

# Create your models here.
class Producto(models.Model):
    # """Modelo de datos de mis productos"""
    nombre = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)
    precio = models.FloatField()
    photo = models.CharField(max_length=200)
    url = models.CharField(max_length=200)

    # -- Usamos el nombre para identificar
    # -- el producto
    def __str__(self):
        return self.nombre


class Pedido(models.Model):
    # """Modelo de datos de mis productos"""
    cliente = models.CharField(max_length=50)
    articulo = models.CharField(max_length=50)
    precio = models.FloatField()

    # -- Usamos el nombre para identificar
    # -- el pedido
    def __str__(self):
        return self.cliente
