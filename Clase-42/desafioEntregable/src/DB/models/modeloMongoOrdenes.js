const { Schema, model } = require('mongoose');

const ordenesSchema = new Schema({
	timestamp: { type: String, required: true },
	productos: { type: Array, required: true },
	email: { type: String, required: true },
	entrega: { type: String, required: true },
});

const modeloOrdenes = model('ordenes', ordenesSchema);

module.exports = modeloOrdenes;
