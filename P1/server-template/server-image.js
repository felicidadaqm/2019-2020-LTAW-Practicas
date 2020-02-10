const http = require('http');
const url = require('url');
const fs = require('fs');
const PUERTO = 8080

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {
  console.log("----------> Peticion recibida")
  let q = url.parse(req.url, true);
  console.log("Recurso:" + q.pathname)
  console.log("URL parseada: ")
  console.log("Host: " + q.host)
  console.log("pathname:" + q.pathname)

  let filename = ""

  //-- Obtener fichero a devolver
  if (q.pathname == "/") {
    var mime = "text/html"
    filename += "index.html"
  } else if (q.pathname == "/css/micss.css") {
    var mime = "text/css"
    filename += "micss.css"
  } else if (q.pathname == "/logo_node.png" ) {
    var mime = "image/png"
    filename += "logo_node.png"
  } else if (q.pathname == "/test1.html") {
    var mime = "text/html"
    filename += "test1.html"
  }

  //-- Leer fichero
  fs.readFile(filename, function(err, data) {

    //-- Fichero no encontrado. Devolver mensaje de error
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }

    //-- Generar el mensaje de respuesta
    res.writeHead(200, {'Content-Type': mime});
    res.write(data);
    res.end();
  });

}).listen(PUERTO);

console.log("Servidor corriendo...")
console.log("Puerto: " + PUERTO)
