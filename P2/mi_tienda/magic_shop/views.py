# -- Fichero mi_tienda/views.py
from django.http import HttpResponse
from django.shortcuts import render
from random import randint
from django.template import Template, Context

# -- Vista principal de mi tienda
# -- El nombre de la vista puede ser cualquiera. Nosotros lo hemos
# -- llamado index, pero se podría haber llamado pepito
def index(request):
    return render(request, 'index.html')

def prod1(request):
    # -- Obtener el número aleatorio
    return render(request, 'prod1.html')

def prod2(request):
    prueba = '123'
    return render(request, 'prod2.html', {'imag': 'images/conjunto', 'cont1': prueba,
     'precio': '15' })
