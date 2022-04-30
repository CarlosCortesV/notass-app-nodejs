const notesCtrl = {}; //Array para guardar las notas
const flash = require("connect-flash/lib/flash");
const Note = require("../models/Note"); //Requiero el modelo de notas
const {validateNote} = require("../helpers/auth"); //Requiero el archivo auth.js
notesCtrl.renderNoteForm = (req, res) => {
    res.render("notes/new-note");
    console.log(req.user); //Imprime la nota
}
notesCtrl.createNewNote = async (req, res) => {
    // console.log(req.body); //Imprime el objeto que se envia por post, en este caso el objeto que contiene el titulo y el contenido
    const {title, description} = req.body //Asigno los valores del objeto a las variables title y description
    const newNote = new Note({title, description})//Creo una nueva nota con los valores de title y description
    newNote.user = req.user.id; //Le asigno el id del usuario que esta en la sesion
    await newNote.save() // Guardo la nota
    req.flash("success_msg", "Nota creada correctamente"); //Le asigno un mensaje de exito
    res.redirect("/notes"); //Redirecciono al index
};
notesCtrl.renderNotes = async(req, res) => {
    const notes = await Note.find({user: req.user.id}).sort({createdAt:"desc"}) //Busco las notas por el id del usuario y las ordeno por fecha de creacion
    res.render("notes/all-notes", {notes}); //Renderizo la vista con el array de notas
};
notesCtrl.renderEditNote = async (req, res) => {
   const note = await Note.findById(req.params.id); //Busco la nota por el id
 
    res.render("notes/edit-note", {note});
};
notesCtrl.updateEditNote = async (req, res) => {
    const {title, description} = req.body; //Asigno los valores del objeto a las variables title y description
    console.log(req.body); //Imprime el objeto que se envia por post, en este caso el objeto que contiene el titulo y el contenido
    await Note.findByIdAndUpdate(req.params.id,{title,description}); //Busco la nota por el id y la actualizo
    req.flash("success_msg", "Nota actualizada correctamente"); //Le asigno un mensaje de exito
    res.redirect("/notes"); //Redirecciono al index
};
notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id); //Busco la nota por el id y la elimino
    req.flash("success_msg", "Nota eliminada correctamente"); //Le asigno un mensaje de exito
    res.redirect("/notes"); //Redirecciono al index

};
module.exports = notesCtrl; //Exporto el objeto notesCtrl