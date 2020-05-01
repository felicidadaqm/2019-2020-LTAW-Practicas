//-- Cargar las dependencias
//-- Modulo express
const express = require('express')
//-- Crear una nueva aplciacion web
const app = express()
//-- Crear un servidor. Los mensajes recibidos los gestiona la app
const http = require('http').Server(app);
//-- Biblioteca socket.io en el lado del servidor
const io = require('socket.io')(http);
//-- Puerto donde lanzar el servidor
const PORT = 8080

var users = 0;
var ids = [];

//-- Lanzar servidor
http.listen(PORT, function(){
  console.log('Servidor lanzado en puerto ' + PORT);
});

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Página principal
app.get('/', (req, res) => {
  let path = __dirname + '/chat.html';
  res.sendFile(path);
  console.log("Acceso a " + path);
});

//-- Otra vista de prueba
app.get('/woala', (req, res) => {
  res.send('WOALA! Chuck Norris approved!! :-)');
  console.log("Acceso a /woala");
});

//-- El resto de peticiones se interpretan como
//-- ficheros estáticos
app.use('/', express.static(__dirname +'/'));

//------ COMUNICACION POR WEBSOCKETS
//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  //-- Usuario conectado. Imprimir el identificador de su socket
  console.log('--> Usuario conectado!. Socket id: ' + socket.id);
  //-- Le damos la bienvenida a través del evento 'hello'
  //-- ESte evento lo hemos creado nosotros para nuestro chat
  users = users + 1;
  ids.push(socket.id)

  for (let i=0; i < ids.length; i++) {
    if (ids[i].includes(socket.id)) {
      socket.emit('hello', "Bienvenido al Chat, eres el usuario " + users);
    } else {
      io.emit('msg', "Nuevo usuario conectado");
    }
  }

  //-- Función de retrollamada de mensaje recibido del cliente
  socket.on('msg', (msg) => {
    console.log("Cliente: " + socket.id + ': ' + msg);
    //-- Enviar el mensaje a TODOS los clientes que estén conectados
    io.emit('msg', msg);
  })

  //-- Usuario desconectado. Imprimir el identificador de su socket
  socket.on('disconnect', function(){
    users = users - 1;
    ids = ids.splice(ids.indexOf(socket.id))
    console.log('--> Usuario Desconectado. Socket id: ' + socket.id);
  });
});
