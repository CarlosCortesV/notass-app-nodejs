const express = require('express'); // import express
const { engine } = require ('express-handlebars');
const path = require('path'); // import path
const morgan = require('morgan'); // import morgan
const methodOverride = require('method-override'); // import method-override
const session = require('express-session'); // import express-session
const flash = require('connect-flash'); // import connect-flash
const passport = require('passport'); // import passport
//Initialize the app
const app = express(); // create an express app, Inicia el servidor
require('./config/passport'); // import passport

//Settigs
app.set('port', process.env.PORT || 3000); // Le asigna el puerto que el sistema tenga disponible y sino le asigna el 3000
app.set("views", path.join(__dirname, "views")); // Le asigna la ruta de las vistas, con el metodo path que concatena las rutas
// Y con el metodo dirname que nos da la ruta del archivo actual

app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', // extension de los archivos de vistas
    runtimeOptions: { // Opciones de configuracion de handlebars
        allowProtoPropertiesByDefault: true, // Permite que las propiedades de los objetos sean accesibles sin el simbolo de $
        allowProtoMethodsByDefault: true,
      },
}));
app.set('view engine', '.hbs');


//Middlewares
app.use(morgan('dev')); // Le asigna el metodo morgan que muestra los datos en consola
app.use(express.urlencoded({extended: false})); // Para que el servidor entienda los datos que se envian por medio de un formulario
app.use(methodOverride('_method')); // Para que el servidor entienda los metodos que se envian por medio de un formulario
app.use(session({
  secret: 'mysecretapp', // Secreto para encriptar la sesion
  resave: true, // Para que la sesion se guarde cuando no se hace ningun cambio
  saveUninitialized: true, // Para que la sesion se guarde cuando no se hace ningun cambio
})); // Le asigna el metodo session que permite almacenar los datos de la sesion
app.use(passport.initialize()); // Inicializa el passport
app.use(passport.session()); // Inicializa el passport
app.use(flash()); // Le asigna el metodo flash que permite mostrar mensajes en la vista

//Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg'); // Le asigna el metodo flash que permite mostrar mensajes en la vista
  res.locals.error_msg = req.flash('error_msg'); // Le asigna el metodo flash que permite mostrar mensajes en la vista
  res.locals.error = req.flash('error'); // Le asigna el metodo flash que permite mostrar mensajes en la vista
  res.locals.user = req.user || null; // Le asigna el metodo flash que permite mostrar mensajes en la vista
  next(); // Le asigna el metodo next que permite continuar con la ejecucion del codigo
}) // Le asigna el metodo que permite mostrar mensajes en la vista


//Routes
app.use(require('./routes/index.routes')); // Importa las rutas de index.routes.js
app.use(require('./routes/notes.routes')); // Importa las rutas de notes.routes.js
app.use(require('./routes/users.routes')); // Importa las rutas de users.routes.js
//Static files
app.use(express.static(path.join(__dirname, 'public'))); // Le asigna la ruta de los archivos estaticos, con el metodo path que concatena las rutas


module.exports = app;
