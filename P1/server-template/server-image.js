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
  let mime = "text/"
  let url1 = q.pathname

  // Buscar función de java para hacer esto
//  if (url1.count('/') > 1) {
//    let recurso = "." + q.pathname
//    console.log(recurso)
//  } else {
//    let peticion = q.pathname.lastIndexOf("/")
//    let recurso = q.pathname.slice(peticion+1)
//  }

  let peticion = q.pathname.lastIndexOf("/")
  let recurso = q.pathname.slice(peticion+1)

  filename = filename + recurso;
  console.log(filename)

  let tipo = q.pathname.lastIndexOf(".")
  let tipo1 = q.pathname.slice(tipo+1)

  if (tipo1 == "/") {
    mime = "text/html"
    filename += "index.html"
  } else {
    mime = mime + tipo1
  }

  console.log(mime)

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
