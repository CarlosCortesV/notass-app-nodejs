const mongoose = require("mongoose"); // importa mongoose para hacer la conexion con la base de datos

const {NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE} = process.env; // lee el archivo .env
const MONGODB_URI = 'mongodb://' + NOTES_APP_MONGODB_HOST + '/' + NOTES_APP_MONGODB_DATABASE; // crea la conexion con la base de datos
mongoose.connect(MONGODB_URI, { // conecta con la base de datos, con la dirección de arriba
    useUnifiedTopology: true, // usa la topologia unificada
    useNewUrlParser: true, // usa el nuevo parser de url
})
    .then(db => console.log("Connected to MongoDB"))   // si se conecta con la base de datos, imprime en consola que se conecto
    .catch(err => console.error(err)); // si no se conecta con la base de datos, imprime en consola el error

module.exports = mongoose; // exporta mongoose