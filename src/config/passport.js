const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/User");

passport.use(new LocalStrategy({
    usernameField: 'email', //El campo con nombre gmail es el email
    passwordField: 'password' //El campo con nombre password es el password
}, async (email, password, done)  => {
    const user = await User.findOne({email: email});
    if(!user){ //Si no existe el correo del usuario, entonces el usuario no existe
        return done(null, false, {message: "El usuario no existe"});
    }
    else{ //Si existe el correo del usuario, entonces verifico la contraseña
        const match = await user.comparePassword(password);
        console.log(match);
        if(match){
            return done(null, user);
        }
        else{
            return done(null, false, {message: "Contraseña incorrecta"});
        }
    }
}));

passport.serializeUser((user, done) => { //Serializo el usuario
    done(null, user.id); //El id del usuario es el id que se guarda en la sesion
});
passport.deserializeUser((id, done) => {//Deserializo el usuario
    User.findById(id, (err, user) => { 
        done(err, user);
    });//Busco el usuario por su id
}); // Cuando el usuario se registre voy a guardarlo en la sesion de mi servidor
//pasport va a consultar la base de datos y verificar si el usuario existe y tiene autorizacion para acceder a la pagina

module.exports = passport;