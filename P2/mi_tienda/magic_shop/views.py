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
    'cont1':'Contiene un xxxxx', 'cont2':'Contiene un xxxxx',
    'cont3': '¡Llévate un xxxx de regalo!' })

def prod2(request):
    product = Producto.objects.all()[1]
    return render(request, 'prod.html', {'product': product,
    'cont1':'Contiene un xxxxx', 'cont2':'Contiene un xxxxx',
    'cont3': '¡Llévate un xxxx de regalo!' })

def prod3(request):
    product = Producto.objects.all()[2]
    return render(request, 'prod.html', {'product': product,
    'cont1':'Contiene un xxxxx', 'cont2':'Contiene un xxxxx',
    'cont3': '¡Llévate un xxxx de regalo!' })

def formulario(request):
    return render(request, 'formulario.html', {})

def recepcion(request):
    # -- Obtener el nombre de la persona
    persona = request.POST['nombre']
    pedido = request.POST['article']

    # -- Cargo los 3 productos para comprobar y actualizar stock
    product1 = Producto.objects.all()[0]
    product2 = Producto.objects.all()[1]
    product3 = Producto.objects.all()[2]

    # -- La página a la que debe redirigirnos por defecto es esta, en caso de
    # -- no haber stock se cambiará.
    pagina = 'recepcion.html'

    if pedido == "Little" and product1.stock > 0:
        precio = product1.precio
        product1.stock = product1.stock - 1
        product1.save()
    elif pedido == "Medium" and product2.stock > 0:
        precio = product2.precio
        product2.stock = product2.stock - 1
        product2.save()
    elif pedido == "Big" and product3.stock > 0:
        precio = product3.precio
        product3.stock = product3.stock - 1
        product3.save()
    else:
        precio = 0.0
        pagina = 'nostock.html'

    new_order = Pedido(cliente=persona, articulo=pedido, precio=precio)
    new_order.save()

    # -- Imprimirlo en la consola del servidor
    print(f" PEDIDO RECIBIDO!!! ----> {persona}")
    print(f" PEDIDO RECIBIDO!!! ----> {pedido}")
    print(f" PEDIDO RECIBIDO!!! ----> {precio}")
    pedido = Pedido.objects.all().last()

    return render(request, pagina, {'pedido': pedido})
