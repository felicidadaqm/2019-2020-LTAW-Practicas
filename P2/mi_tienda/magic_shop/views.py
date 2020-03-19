# -- Fichero mi_tienda/views.py
from django.http import HttpResponse
from django.shortcuts import render
from random import randint
from django.template import Template, Context
from magic_shop.models import Producto

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

def formulario1(request):
    return render(request, 'formulario1.html', {})

def recepcion1(request):
    # -- Obtener el nombre de la persona
    persona = request.POST['nombre']
    pedido = request.POST['article']
    # -- Imprimirlo en la consola del servidor
    print(f" PEDIDO RECIBIDO!!! ----> {persona}")
    print(f" PEDIDO RECIBIDO!!! ----> {pedido}")
    return HttpResponse("Datos recibidos!!. Comprador: " + request.POST['nombre'])
