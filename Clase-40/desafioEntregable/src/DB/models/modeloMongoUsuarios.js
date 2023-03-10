const { Schema, model } = require('mongoose');

const usuariosSchema = new Schema({
	username: { type: String, required: true, max: 100 },
	password: { type: String, required: true, max: 100 },
	nombre: { type: String, required: true, max: 200 },
	direccion: { type: String, required: true, max: 200 },
	edad: { type: Number, required: true, max: 100 },
	telefono: { type: Number, required: true },
	avatar: { type: String, required: true },
	admin: { type: Boolean, required: true },
});

const Usuarios = model('usuarios', usuariosSchema);

module.exports = Usuarios;
