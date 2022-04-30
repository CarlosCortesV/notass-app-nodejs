const { use } = require("passport/lib");
const User = require("../models/User");
const usersCtrl = {}; 
const pasport = require("passport");
usersCtrl.renderSignUpForm = (req, res) => { //Renderizo la vista de signup
    res.render("users/signup");
}
usersCtrl.signup = async (req,res) => { //Registro de usuario
    // console.log(req.body); //Imprime el objeto que se envia por post, en este caso el objeto que contiene el nombre, el gmail y la contraseña
    const errors = []; //Creo un array para guardar los errores
    const {name, email, password, password_confirmation} = req.body; //Asigno los valores del objeto a las variables name, email, password y confirm_password
    if (password != password_confirmation) {
        errors.push({ text: "Passwords do not match." });
      }
      if (password.length < 4) {
        errors.push({ text: "Passwords must be at least 4 characters." });
      }
      if (errors.length > 0) { //Si hay errores, redirecciono a la vista signup con los errores
        res.render("users/signup", {
          errors,
          name,
          email,
          password,
          password_confirmation,
        });
      } else { //Si no hay errores, creo un nuevo usuario
        const emailUser= await User.findOne({ email: email }); //Busco un usuario con el gmail que se recibe por parametro
        if (emailUser) { //Si encuentro un usuario con el gmail que se recibe por parametro
          req.flash("error_msg", "The email is already registered."); //Creo un mensaje de error
          res.redirect("/signup"); //Redirecciono a la vista signup
        } else { //Si no encuentro un usuario con el gmail que se recibe por parametro
            const newUser = new User({ name, email, password }); //Creo un nuevo usuario con los datos que se reciben por parametro
            newUser.password = await newUser.encryptPassword(password); //Encripto la contraseña
            await newUser.save(); //Creo un nuevo usuario con los valores de name, email, password y confirm_password
            req.flash("success_msg", "You are registered. Please log in.");
            res.redirect("/signin");
        }
      }

  
    
}

usersCtrl.renderSigninForm = (req, res) => { //Renderizo la vista de signin
    res.render("users/signin");
}


usersCtrl.signin = pasport.authenticate("local", {//Autenticacion de usuario
    successRedirect: "/notes", //Si el usuario existe, redirecciono a la pagina notes
    failureRedirect: "/signin", //Si el usuario no existe, redirecciono a la pagina signin
    failureFlash: true //Creo un mensaje de error
}); 

usersCtrl.logout = (req, res) => { //Cierro sesion
    req.logout();
    req.flash("success_msg", "You are logged out.");
    res.redirect("/signin");
};

module.exports = usersCtrl;

