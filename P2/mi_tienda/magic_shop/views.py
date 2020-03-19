# -- Fichero mi_tienda/views.py
from django.http import HttpResponse
from django.shortcuts import render
from random import randint
from django.template import Template, Context
from magic_shop.models import Producto, Pedido

# -- Vista principal de mi tienda
# -- El nombre de la vista puede ser cualquiera. Nosotros lo hemos
# -- llamado index, pero se podría haber llamado pepito
def index(request):
    product = Producto.objects.all()
    return render(request, 'index.html', {'product': product})

def prod1(request):
    # -- Obtener el número aleatorio
    product = Producto.objects.all()[0]
    return render(request, 'prod.html', {'product': product,
    'cont1':'nanana', 'cont2': 'blabla' })

def prod2(request):
    product = Producto.objects.all()[1]
    return render(request, 'prod.html', {'product': product,
    'cont1':'nanana', 'cont2': 'blabla' })

def prod3(request):
    product = Producto.objects.all()[2]
    return render(request, 'prod.html', {'product': product,
    'cont1':'nanana', 'cont2': 'blabla' })

def formulario(request):
    return render(request, 'formulario.html', {})

def recepcion(request):
    # -- Obtener el nombre de la persona
    persona = request.POST['nombre']
    pedido = request.POST['article']

    if pedido == "Little":
        precio = 14.99
    elif pedido == "Medium":
        precio = 24.99
    else:
        precio = 34.99

    new_order = Pedido(cliente=persona, articulo=pedido, precio=precio)
    new_order.save()

    pedido = Pedido.objects.all().last()

    # -- Imprimirlo en la consola del servidor
    print(f" PEDIDO RECIBIDO!!! ----> {persona}")
    print(f" PEDIDO RECIBIDO!!! ----> {pedido}")
    print(f" PEDIDO RECIBIDO!!! ----> {precio}")

    return render(request, 'recepcion.html', {'pedido': pedido})
