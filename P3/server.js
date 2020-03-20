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

  //-- Leer las cookies
  const cookie = req.headers.cookie;
  console.log("Cookie: " + cookie)

  // -- Buscamos cuantas "/" tiene el recurso pedido para sacar ubicación
  var barras = repeticion(q.pathname, "/")

  // -- Buscamos el "." final para poder indicar que tipo mime es
  let tipo = q.pathname.lastIndexOf(".")
  let tipo1 = q.pathname.slice(tipo+1)
  mime = mime + tipo1

  // Recoge la dirección del recurso que se busca y su mime
  if (barras > 1) {
    recurso = "." + q.pathname
  } else {
    let peticion = q.pathname.lastIndexOf("/")
    recurso = q.pathname.slice(peticion+1)
  }

  //-- Segun el recurso al que se accede
  switch (q.pathname) {
    //-- Pagina principal
    case "/":
      content = "Bienvenido a mi tienda "
      //-- No hay ninguna cookie
      if (!cookie) {
        content += "\nNo te conozco... Registrate!\n"
        content += "Accede a /login"
        mime = "text/plain"
      //-- Hay definida una Cookie. Entra a la vista principal de la tienda
      } else {
        content += "Obijuan"
        mime = "text/html"
        filename += "index.html"
      }
      res.statusCode = 200;
      break;

    //-- Pagina de acceso
    case "/login":
      content = "Registrado! Cookie enviada al navegador!"
      //-- ESTABLECER LA COOKIE!!
      res.setHeader('Set-Cookie', 'user=obijuan')
      break

    //-- Se intenta acceder a un recurso que no existe
    default:
      content = "Error";
      res.statusCode = 404;
  }

  filename = filename + recurso;
  console.log("__________")
  console.log(filename)
  console.log(recurso)


  // Montando el mensaje de respuesta dependiendo del mime
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
