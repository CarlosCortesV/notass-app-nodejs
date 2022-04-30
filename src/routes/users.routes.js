const {Router} = require("express"); //Requiero el modulo de express con la funcion Router
const router = Router(); //Guardo el objeto router en una variable
const {renderSignUpForm,
    signup,
    renderSigninForm,
    signin, logout} = require("../controllers/users.controller"); //Requiero el archivo de controladores



router.get("/signup", renderSignUpForm); //Le asigno la ruta /signup y le asigno el metodo renderSignUpForm
router.post("/signup", signup); //Le asigno la ruta /signup y le asigno el metodo signup
router.get("/signin", renderSigninForm); //Le asigno la ruta /signin y le asigno el metodo renderSigninForm
router.post("/signin", signin); //Le asigno la ruta /signin y le asigno el metodo signin
router.get("/logout", logout); //Le asigno la ruta /logout y le asigno el metodo logout


//Importo el controlador de usuarios
module.exports = router; //Exporto el objeto router
