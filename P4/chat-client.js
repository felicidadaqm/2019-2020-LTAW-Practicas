console.log("Ejecutando cliente JS...");

//-- Obtener los elementos del DOM
const display = document.getElementById("display");
const msg = document.getElementById("msg");
const send = document.getElementById("send");

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

//-- Se ha recibido el evento 'hello', mensaje de bienvenida del servidor
socket.on('hello', (msg) => {
  console.log("Mensaje del servidor: " + msg);
  //-- Ponerlo en el párrafo display
  display.innerHTML = "<ul class='server'>" + msg + "</ul>";
});

//-- Se ha recibido el evento 'hello', mensaje de bienvenida del servidor
socket.on('cmd', (msg) => {
  console.log("Mensaje del servidor: " + msg);
  //-- Ponerlo en el párrafo display
  display.innerHTML += "<ul class='server'>" + msg + "</ul>";
});

//-- Se ha recibido un mensaje
socket.on('msg', (msg) => {
  //-- Añadirlo al párrafo display
  console.log(msg)
  display.innerHTML += "<ul class='msg'>" + msg + "</ul>";
});

//-- Botón de envío apretado
send.onclick = () => {
  //-- Se envía el mensaje escrito, 'msg' para los mensajes de usuario
  //-- Si no se ha introducido ningún mensaje, no se envía
  if (msg.value) {
    let initial = msg.value.charAt(0)
    console.log(initial)
    if (initial == "/") {
      socket.emit('cmd', msg.value)
    } else {
      socket.emit('msg', msg.value)
    }
  //-- Borramos el mensaje escrito
  msg.value="";
  }
}
