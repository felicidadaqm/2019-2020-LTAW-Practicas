//-- Puerto donde recibir las peticiones
const PUERTO = 8080;

//-- Modulo http
const http = require('http');


console.log("Arrancando servidor...")

//-- Funcion para atender a una Peticion
//-- req: Mensaje de solicitud
//-- res: Mensaje de respuesta
//--function peticion(req, res) {

  //-- Peticion recibida
//--  console.log("Peticion recibida!")

  //-- Crear mensaje de respuesta
//--  res.writeHead(200, {'Content-Type': 'text/html'});
//--  res.end('Hello World!');

//-- }

//-- Inicializar el servidor
//-- Cada vez que recibe una petición
//-- invoca a la funcion peticion para atenderla
//--const server = http.createServer(peticion)


//-- Configurar el servidor para escuchar en el
//-- puerto establecido
//--server.listen(PUERTO);

//-- Configurar el servidor
http.createServer( (req, res) => {
  console.log("---> Peticion recibida")
  console.log("Recurso solicitado (URL): " + req.url)

  if (req.url == '/hola') {
    console.log('Página de hola');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
  } else {
  //-- Crear mensaje de respuesta
    res.writeHead(200, {'Content-Type': 'text/html'});
//    fs.readFile("./xyz/index.html", (err,fileContent) =>
//      {
//        res.end(fileContent);
//      });
    res.write(`<!doctype html><html><head></head>
              <body><h1>Probando html</h1></body></html>`);
    res.end();
}).listen(PUERTO);

console.log("Servidor LISTO!")
console.log("Escuchando en puerto: " + PUERTO)
