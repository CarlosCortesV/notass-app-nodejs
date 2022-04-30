const {Router} = require("express"); //Requiero el modulo de express con la funcion Router
const indexCtrl = require("../controllers/index.controller"); // Requiero el archivo index.controller.js
const router = Router(); //Guardo el objeto router en una variable 
const {rederIndex, rederAbout} = require("../controllers/index.controller"); //Requiero el metodo rederIndex y rederAbout del archivo index.controller.js

router.get("/", rederIndex); // Le asigno la ruta / y le asigno el metodo rederIndex
router.get("/about", rederAbout); // Le asigno la ruta /about y le asigno el metodo rederAbout

module.exports = router; // Exporto el objeto router