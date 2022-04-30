//Archivo que arranca la aplicacion

require("dotenv").config(); // lee el archivo .env

const app = require("./server.js"); // importa el archivo del servidor

require("./database.js"); // importa las configuraciones para conectar la base de datos MongoDB

app.listen(app.get("port"), () => { // escucha en el puerto que esta definido en el archivo server.js
   console.log("Servidor trabajandoen el puerto 3000",app.get("port")); // imprime en consola el mensaje
});