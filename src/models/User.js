const {Schema,model} = require("mongoose"); // importa el modulo mongoose
const encrypt = require("bcryptjs");
const UserShema = new Schema({ // crea una nueva estructura de datos
    name:{
        type: String,
        required: true // El nombre es requerido
    },
    email:{
        type: String,
        required: true, // El gmail es requerido
        unique: true // El gmail debe ser unico
    },
    password:{
        type: String,
        required: true // El password es requerido
    },
},{
    timestamps: true // Crea los campos de fecha de creacion y actualizacion
});
//Encripcion de la contraseña
UserShema.methods.encryptPassword = async (password) => { //Encripto de contraseña que se recibe por parametro
    const salt = await encrypt.genSalt(10); //Creo un salt de 10 caracteres
    return await encrypt.hash(password,salt); //Encripto la contraseña
    
};
//Comparacion de la contraseña
UserShema.methods.comparePassword = async function(password){ //Comparo la contraseña que se recibe por parametro con la que esta en la base de datos
    return await encrypt.compare(password,this.password); //Comparo la contraseña que esta incriptada con la que se recibe por parametro que tambien esta incriptada
    //Compara la constraseña que me pasa el usuario ("password") con la que esta en la base de datos ("this.password")
};

module.exports = model("User", UserShema); // crea un nuevo modelo con el nombre Note y con el Schema NoteShema



