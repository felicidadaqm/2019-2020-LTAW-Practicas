// Acceso al modulo fs para lectura de datos
const fs = require('fs');

// Leer fichero. AL terminar se invoca la función
fs.readFile('test.txt', 'utf8', function (err, data) {
    // -- Mostrar el contenido del fichero
    console.log(data)
})
