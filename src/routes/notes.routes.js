const {Router} = require("express"); //Requiero el modulo de express con la funcion Router
const { is } = require("express/lib/request");
const req = require("express/lib/request");
const router = Router(); //Guardo el objeto router en una variable
const { renderNoteForm, 
        createNewNote, 
        renderNotes,
        renderEditNote,
        updateEditNote,
        deleteNote 
        } = require("../controllers/notes.controller"); //Requiero el archivo index.controller.js
const {isAuthenticated,authorizedEditNote} = require("../helpers/auth"); //Requiero el archivo auth.js

//New Note
router.get("/notes/add",isAuthenticated,renderNoteForm); //Le asigno la ruta /notes/add y le asigno el metodo renderNoteForm
//Create Note
router.post("/notes/new-note",isAuthenticated,createNewNote); //Le asigno la ruta /notes/new-note y le asigno el metodo createNewNote

//Get All Note
router.get("/notes",isAuthenticated,renderNotes); //Le asigno la ruta /notes/add y le asigno el metodo renderNoteForm

//Edit Note
router.get("/notes/edit/:id",authorizedEditNote,isAuthenticated,renderEditNote); //Le asigno la ruta /notes/edit/:id y le asigno el metodo renderNoteForm

//Update Note
router.put("/notes/edit/:id",isAuthenticated,updateEditNote); //Le asigno la ruta /notes/edit/:id y le asigno el metodo renderNoteForm con el metodo put para actualizar los datos

//Delete Note
router.delete("/notes/delete/:id",isAuthenticated,deleteNote); //Le asigno la ruta /notes/edit/:id y le asigno el metodo renderNoteForm con el metodo delete para eliminar los datos



module.exports = router;