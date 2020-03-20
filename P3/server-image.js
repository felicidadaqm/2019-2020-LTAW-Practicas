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
  let recurso = ""
  let mime = "text/"

  // -- Función que calcula cuantas veces se repite un caracter en la cadena
  function repeticion(cadena, caracter){
    var indices = [];
      for(var i = 0; i < cadena.length; i++) {
        if (cadena[i].toLowerCase() === caracter) indices.push(i);
      }
  	return indices.length;
  }

  // -- Buscamos cuantas "/" tiene el recurso pedido para sacar ubicación
  var barras = repeticion(q.pathname, "/")

  // -- Buscamos el "." final para poder indicar que tipo mime es
  let tipo = q.pathname.lastIndexOf(".")
  let tipo1 = q.pathname.slice(tipo+1)

  // -- If para completar el nombre del recurso y tipo mime del mismo
  if (barras > 1) {
    recurso = "." + q.pathname
    mime = mime + tipo1
  } else {
    if (tipo1 == "/") {
      mime = "text/html"
      filename += "index.html"
    } else {
      mime = mime + tipo1
    }
    let peticion = q.pathname.lastIndexOf("/")
    recurso = q.pathname.slice(peticion+1)
  }

  filename = filename + recurso;


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
