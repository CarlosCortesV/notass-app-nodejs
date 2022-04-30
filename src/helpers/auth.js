const helpers = {}; // Export the module
const Note = require("../models/Note"); //Requiero el modelo de notas
helpers.isAuthenticated = (req, res, next) => { // Funcion que permite validar si el usuario esta autenticado
    if (req.isAuthenticated()) { // Si el usuario esta autenticado
        return next(); // Seguir con la ejecucion del codigo
    }
    req.flash("error_msg", "No estas autenticado"); 
    res.redirect('/signin'); // Si no esta autenticado, redireccionar al login
}
helpers.authorizedEditNote = async(req, res, next) => {
    const note = await Note.findById(req.params.id, (err, note) => {
        if (err) {
            req.flash("error_msg", "No se encontro la nota");
            res.redirect("/notes");
        } else {
            if (note.user != req.user.id) {
                req.flash("error_msg", "No tienes autorizacion para editar esta nota");
                res.redirect("/notes");
            } else {
                next();
            }
        }
    });
} // Funcion que permite validar si el usuario esta autorizado para editar la nota

 // Funcion que valida si la url es valida
module.exports = helpers;