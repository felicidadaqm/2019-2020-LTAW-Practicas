//-- Traza de prueba
console.log("Hola!")

//-- Obtener el botón de VER del DOM
const ver = document.getElementById('busqueda')

//-- Obtener el párrafo del DOM donde mostrar el resultado
const resultado = document.getElementById('resultado');

//-- Cuando el usuario aprieta el botón de ver los productos
ver.oninput = ()=>{

  //-- Crear objeto para hacer peticiones AJAX
  const m = new XMLHttpRequest();

  // Configuramos la petición AJAX
  busqueda = document.getElementById('busqueda').value;
  request = "http://localhost:8080/myquery?param1="
  request += busqueda
  //-- Configurar la petición
  m.open("GET",request, true);

  //-- Cuando la haya alguna noticia sobre la peticion ejecuta este código
  m.onreadystatechange=function(){
     //-- Petición enviada y recibida. Todo OK!
     if (m.readyState==4 && m.status==200){

       //-- La respuesta es un objeto JSON
       let productos = JSON.parse(m.responseText)
       //-- Borrar el resultado anterior que hubiese en el párrafo de resultado
       resultado.innerHTML = "";

       // Array para meter los productos que cumplan con la búsqueda
       cumplen = []
       //--Recorrer los productos del objeto JSON
       for (let i=0; i < productos.length; i++) {
         if (busqueda.length >= 3) {
            // Comprobamos si lo escrito en la búsqueda está en algún elemento del array
            if ((productos[i].toLowerCase()).includes(busqueda.toLowerCase())) {
                if (cumplen.includes(productos[i])) {
                } else {
                  cumplen.push(productos[i])
                  //-- Añadir cada producto al párrafo de visualización
                  resultado.innerHTML +=  productos[i];
                  //-- Separamos los productos por ',''
                  if (i <= cumplen.length-1) {
                    resultado.innerHTML += ', ';
                  }
                }
            }
          }
        }
     }
   }
   //-- Enviar la petición!
   m.send();
}
