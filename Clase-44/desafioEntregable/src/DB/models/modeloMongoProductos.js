const { Schema, model } = require('mongoose');

const productosSchema = new Schema({
	nombre: { type: String, required: true, max: 200 },
	precio: { type: Number, required: true },
	categoria: { type: String, required: true },
	thumbnail: { type: String, required: true },
	stock: { type: Number, required: true },
	codigo: { type: Number, required: true },
	descripcion: { type: String, required: true },
});

const modeloProductos = model('productos', productosSchema);

module.exports = modeloProductos;
