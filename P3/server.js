const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080

// Función para ver las "/" del recurso pedido
function repeticion(cadena, caracter){
  var indices = [];
    for(var i = 0; i < cadena.length; i++) {
      if (cadena[i].toLowerCase() === caracter) indices.push(i);
    }
  return indices.length;
}

// Función que saca el valor de un recurso o una cookie
function recortar(datos, caracter) {
  find = datos.lastIndexOf(caracter)
  value = datos.slice(find+1)

  return value;
}

// Creamos un html muy básico para las páginas de confirmación
// -- ARREGLAR PARA QUE SIRVA PARA LOS CARRITOS
function htmlbase(tipoconf, variable, boton) {
  context =  `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <title>Confirmacióno</title>
        <link rel="stylesheet" href="css/css_login.css">
        <link href="https://fonts.googleapis.com/css?family=Lemonada&display=swap" rel="stylesheet">
      </head

      <body>
        <div class="header">
          <h1> Magic shop</h1>
        </div>

        <div class="main"> `
    context += tipoconf
    context += `
          <div class="cuadro"> `
    context += variable
    context += `
          </div>
          <br>
          <br> `
    context += boton
    context += `
        </div>
      </body>
      </html>
      `
    return context
}

function constructor(req, res, content, mime) {
  res.setHeader('Content-Type', mime)
  res.write(content);
  res.end();
}

//-- Funcion para atender a una Peticion
//-- req: Mensaje de solicitud
//-- res: Mensaje de respuesta
function peticion(req, res) {

  //-- Mostrar en la consola el recurso al que se accede
  console.log("----------> Peticion recibida")
  let q = url.parse(req.url, true);
  console.log("Recurso:" + q.pathname)
  console.log("URL parseada: ")
  console.log("Host: " + q.host)
  console.log("pathname:" + q.pathname)

  let filename = ""
  let recurso = ""
  let mime = "text/"

  // -- Buscamos el "." final para poder indicar que tipo mime es
  let tipo = recortar(q.pathname, ".")
  mime = mime + tipo

  // -- Buscamos cuantas "/" tiene el recurso pedido para sacar ubicación
  var barras = repeticion(q.pathname, "/")

  // Recoge la dirección del recurso que se busca y su mime
  if (barras > 1) {
    recurso = "." + q.pathname
  } else {
    recurso = recortar(q.pathname, "/")
  }

  // Nombre del fichero
  filename = filename + recurso;

  //-- Leer las cookies
  const cookie = req.headers.cookie;
  console.log("Cookie: " + cookie)

  //-- Segun el recurso al que se accede
  switch (q.pathname) {
    //-- Pagina principal
    case "/":
      mime = "text/html"
      // -- Primero comprobamos que el usuario esté loggeado.
      if (!cookie) {
        filename += "nologgeado.html"
      //-- Hay definida una Cookie. Entra a la vista principal
      } else {
        filename += "index.html"
      }

      content = fs.readFileSync(filename, "utf-8")
      constructor(req, res, content, mime)
      break;

    //-- Pagina de registro
    case "/login":
      mime = "text/html"
      filename = "login.html"

      if (req.method === 'POST') {
          // Handle post info...
          req.on('data', chunk => {
              //-- Leer los datos (convertir el buffer a cadena)
              data = chunk.toString();
              //-- Añadimos el usuario al html base
              usuario= recortar(data, "=")
              confirmacion = "<h2>Confirmación de registro</h2>"
              usuario1 = "<p>¡Bienvenido " + usuario + "!</p>"
              boton =  '<a href="/" class="button">Pagina principal</a>'
              content = htmlbase(confirmacion, usuario1, boton)
              //-- Mostrar los datos en la consola del servidor
              console.log("Datos recibidos: " + data)

              //-- ESTABLECER LA COOKIE!!
              res.setHeader('Set-Cookie', 'user=' + usuario)
              res.statusCode = 200;
           });

           req.on('end', ()=> {
             //-- Generar el mensaje de respuesta
             constructor(req, res, content, "text/html")
           })
           return
        }
        content = fs.readFileSync(filename, "utf-8")
        constructor(req, res, content, mime)
      break;

    // Carrito de la compro
    case '/shoppingcart':
      // Sacamos los datos de los productos que van a comprarse
      if (cookie.includes("shoppingcart=")) {
        let products = recortar(cookie, "=")
        // Número de productos en el carrito.
        let numprod = repeticion(cookie, "&")

        var cosas = []
        for (var i = 0; i < numprod; i++) {
            find = products.indexOf("&")
            value = products.slice(0, find)
            products = products.slice(find+1,)
            cosas.push(value)

        }
          cosas.push(products)
          tipoconf = "<h2>Carrito de la compra</h2>"

          let little = 0;
          let medium = 0;
          let big = 0;
          let price = 0;

          // RECORRER EL ARRAY CON LOS PRODUCTOS Y FORMAR EL html
          // CON PRODUCTOS + PRECIO TOTAL
          for (var i = 0; i < cosas.length; i++) {
            console.log(cosas[i])
            if (cosas[i] == "Little") {
              little = little + 1
              price = price + 14.99
            } else if (cosas[i] == "Medium") {
              medium = medium + 1
              price = price + 29.99
            } else if (cosas[i] == "Big") {
              big = big + 1
              price = price + 34.99
            }
          }

          cantidad = "<br><lu>Little Mystery Box: " + little + "</lu>"
          cantidad += "<br><lu>Medium Mystery Box: " + medium + "</lu>"
          cantidad += "<br><lu>Big Mystery Box: " + big + "</lu>"
          cantidad += "<br><br><p>Total compra:       " + price + " $ </p>"
          boton =  '<a href="/compra" class="button">Confirmar compra</a>'
          boton += '<a href="/" class="button">Seguir comprando</a>'

      } else {
        tipoconf = tipoconf = "<h2>Carrito de la compra</h2>"
        cantidad = "<p>¡No hay nada en tu carrito de la compra!</p>"
        boton =  '<a href="/" class="button">Seguir comprando</a>'
      }
      mime = "text/html"
      data = htmlbase(tipoconf, cantidad, boton)
      constructor(req, res, data, mime)

      break;

      // AÑADIR OTRO CASE PARA CONFIRMACIÓN DE COMPRA
    

    //-- El resto de recursos, si no existe la respuesta está contemplada más abajo
    default:
      // Si añadimos un producto al carrito, añado ese producto a la cookie del carrito
      if (req.method === 'POST') {
          // Handle post info...
          req.on('data', chunk => {
              //-- Leer los datos (convertir el buffer a cadena)
              data = chunk.toString();
              //-- Comprobamos que esté la cookie de usuario.
              if (cookie.includes("user=")) {
                // Buscamos que producto han pedido
                let order = recortar(data, "=")

                //  Vemos si existe cookie para el carrito. Añadimos o creamos
                if (cookie.includes("shoppingcart=")) {
                  let old_cookie = recortar(cookie, "=")
                  let new_cookie = old_cookie + "&" + order
                  console.log("La nueva cookie es -------->")
                  console.log(new_cookie)
                  res.setHeader('Set-Cookie', 'shoppingcart=' + new_cookie)
                } else {
                  // -- Si no hay cookie para el carrito, la creamos
                  res.setHeader('Set-Cookie', 'shoppingcart=' + order)
                }

              } else {
                filename = "nologgeado.html"
                mime = "text/html"
              }
              // Una vez metido el producto en el carrito, nos quedamos en la misma página
              content = fs.readFileSync(filename, "utf-8")
              //res.statusCode = 200;
         });

         req.on('end', ()=> {
           //-- Generar el mensaje de respuesta
           constructor(req, res, content, mime)
         })
         return
      }

      // Montando el mensaje de respuesta para el resto de peticiones
      fs.readFile(filename, function(err, data) {
          if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
          }
          //-- Generar el mensaje de respuesta
          res.writeHead(200, {'Content-Type': mime});
          res.write(data);
          res.end();
        });

      break
  }

}

//-- Inicializar el servidor
//-- Cada vez que recibe una petición
//-- invoca a la funcion peticion para atenderla
const server = http.createServer(peticion)

//-- Configurar el servidor para escuchar en el
//-- puerto establecido
server.listen(PUERTO);

console.log("Servidor LISTO!")
console.log("Escuchando en puerto: " + PUERTO)
