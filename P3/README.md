# Práctica 3

INSTRUCCIONES.

  ——— La carpeta "Clase" corresponde a ejemplos y pruebas de github.

  ——— El resto de archivos se necesitan para poner en funcionamiento la práctica.

  ——— Se lanza con node server.js

  ——— El servidor se encuentra en http://localhost:8080/

  ——— Si no existe ninguna cookie, la primera vez que accedemos nos pide registrarnos
  para acceder al contenido. Pulsamos el botón de registrarse, introducimos un Nombre
  de usuario y ya podremos acceder a la página, se crea una cookie que recuerde este
  usuario. Nos confirmarán el registro y accedemos a la página principal.

  ——— En la página principal encontramos los productos de la tienda, una barra de búsqueda,
  un link al carrito y un reconocimiento de que hemos iniciado sesión.

  ——— Si entramos en la página de un producto y pinchamos en "añadir al carrito", se creará
  una cookie de carrito (en caso de que antes no existiese). Tras añadir el producto al
  carrito permanecemos en la misma página. Con la flechita podemos volver a la página
  principal.

  ——— Si pinchamos en "carrito" nos aparecen los productos que tenemos en él, la cantidad de
  los mismos, el precio total de la compra y un formulario para rellenar con distintos datos.

  ——— Una vez se realiza el pedido nos envía a una página de confirmación donde aparece el
  resumen de los datos introducidos. (Al escribir el correo aparecen dos caracteres en lugar
  del @ que no he logrado cambiar, el resto funciona bien).

  ——— Si volvemos a la página principal podemos usar la barra de búsquedas para encontrar
  ciertos productos. Estos son: ["FPGA-1", "RISC-V", "74ls00", "FPGA-2", "74ls01", "AVR",
  "Arduino-UNO"] por simplicidad.

  ——— Cuando haya al menos 3 caracteres introducidos en la barra de búsquedas empezarán a
  aparecer coincidencias. Es decir, si metemos fpg nos aparecerá FPGA-1 y FPGA-2 a la derecha,
  si borramos caracteres o añadimos más los resultados de la búsqueda se actualizan.

  ——— No importa si meto los caracteres en mayúscula o minúscula, al terminar de escribir el
  producto en la barra de búsqueda y pulsar enter se comprobará si coincide con alguno de los
  productos en el array. Si existe, se genera una página al vuelo indicando el producto sobre
  el que has buscado información. Si no está en el array, se genera una página al vuelo
  indicando que el producto buscado no se encuentra en stock.
