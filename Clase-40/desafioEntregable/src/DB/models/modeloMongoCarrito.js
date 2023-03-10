const { Schema, model } = require('mongoose');

const carritoSchema = new Schema({
	timestamp: { type: String, required: true },
	productos: { type: Array, required: true },
	_id: {},
});

const modeloMensaje = model('carrito', carritoSchema);

module.exports = modeloMensaje;
