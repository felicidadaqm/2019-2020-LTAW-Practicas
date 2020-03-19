from django.urls import path

# -- Importar todas las vistas de mi_tienda
from . import views

# -- Aquí se definen las URLs de nuestra tienda
# -- Metemos de momento sólo la principal (índice)

urlpatterns = [
    # -- Vista pricipal (índice)
    path('', views.index, name='index'),
    path('prod1/', views.prod1, name='producto1'),
    path('prod2/', views.prod2, name='producto2'),
    path('prod3/', views.prod3, name="producto3"),
    path('formulario/', views.formulario, name='formulario'),
    path('recepcion/', views.recepcion, name='reception'),
]
