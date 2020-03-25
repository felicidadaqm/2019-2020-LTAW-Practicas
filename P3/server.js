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

// Creamos un html muy básico para las páginas de confirmación
// -- ARREGLAR PARA QUE SIRVA PARA LOS CARRITOS
function htmlbase(tipoconf, variable) {
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
          <div class="cuadro">
          <p>¡Bienvenido `
    context += variable
    context += `
          !</p>
          </div>
          <br>
          <br>
          <a href="/" class="button">Pagina principal</a>
        </div>
      </body>
      </html>
      `
    return context
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
  let tipo = q.pathname.lastIndexOf(".")
  let tipo1 = q.pathname.slice(tipo+1)
  mime = mime + tipo1

  // -- Buscamos cuantas "/" tiene el recurso pedido para sacar ubicación
  var barras = repeticion(q.pathname, "/")

  // Recoge la dirección del recurso que se busca y su mime
  if (barras > 1) {
    recurso = "." + q.pathname
  } else {
    let peticion = q.pathname.lastIndexOf("/")
    recurso = q.pathname.slice(peticion+1)
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
      // -- Primero comprobamos que el usuario esté loggeado.
      content = "Bienvenido a mi tienda "
      //-- No hay ninguna cookie
      if (!cookie) {
        // FALTA ESTE HTML Y CAMBIAR MIME, ETC
        content += "\nNo te conozco... Registrate!\n"
        content += "Accede a /login"
        mime = "text/plain"
      //-- Hay definida una Cookie. Entra a la vista principal
      } else {
        mime = "text/html"
        filename += "index.html"
      }
      res.statusCode = 200;

      break;

    //-- Pagina de registro
    case "/login":
      // ARREGLAR ESTO
      mime = "text/html"
      filename = "login.html"

      if (req.method === 'POST') {
          // Handle post info...
          req.on('data', chunk => {
              //-- Leer los datos (convertir el buffer a cadena)
              data = chunk.toString();
              //-- Añadir los datos a la respuesta
              usuario = data.indexOf("=")
              usuario1 = data.slice(usuario+1,)
              //-- Añadimos el usuario al html base
              confirmacion = "<h2>Confirmación de registro</h2>"
              content = htmlbase(confirmacion, usuario1)
              //-- Mostrar los datos en la consola del servidor
              console.log("Datos recibidos: " + data)

              //-- ESTABLECER LA COOKIE!!
              res.setHeader('Set-Cookie', 'user=' + usuario1)
              res.statusCode = 200;
           });

           req.on('end', ()=> {
             //-- Generar el mensaje de respuesta
             res.setHeader('Content-Type', 'text/html')
             res.write(content);
             res.end();
           })
           return
        }
      break;

    //-- Se intenta acceder a un recurso que no existe
    default:
      if (req.method === 'POST') {
          // Handle post info...
          req.on('data', chunk => {
              //-- Leer los datos (convertir el buffer a cadena)
              data = chunk.toString();

              //-- Comprobamos que esté la cookie de usuario.
              if (cookie.includes("user=")) {
                console.log(data);
                // --- Buscamos el producto pedido
                let order = data.indexOf("=")
                let order1 = data.slice(order+1)
                console.log(order1)

                // --- Establecemos una cookie con ese productos
                res.setHeader('Set-Cookie', 'product=' + order1)

              } else {
                content += "\nNo te conozco... Registrate!\n"
                content += "Accede a /login"
                mime = "text/plain"
              }
         });

         req.on('end', ()=> {
           //-- Generar el mensaje de respuesta
           res.setHeader('Content-Type', 'text/plain')
           res.write("probando");
           res.end();
         })
         return
      }

      //content = "Error";
      //res.statusCode = 404;
  }

  console.log("__________")
  console.log(filename)
  console.log(recurso)


  // Montando el mensaje de respuesta dependiendo del mime
  // BORRAR EL PRIMERO CUANDO HAGA HTML PARA NO LOGGEADO
  if (mime == "text/plain") {
    res.setHeader('Content-Type', mime)
    res.write(content);
    res.end();
  } else {
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
