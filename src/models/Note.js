const {Schema,model} = require("mongoose"); // importa el modulo mongoose

const NoteShema = new Schema({ // crea una nueva estructura de datos
    title:{
        type: String,
        required: true // El titulo es requerido
    },
    description: {
        type: String,
        required: true // La descripcion es requerida
    },
    user:{
        type: String,
        required: true,
    }
},{
    timestamps: true // Crea los campos de fecha de creacion y actualizacion
});

module.exports = model("Note", NoteShema); // crea un nuevo modelo con el nombre Note y con el Schema NoteShema
