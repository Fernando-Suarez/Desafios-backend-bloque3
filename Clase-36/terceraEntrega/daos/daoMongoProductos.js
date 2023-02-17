const Contenedor = require('../contenedores/contenedorMongo');
const modeloProductos = require('../DB/models/modeloMongoProductos');

class productosDaoMongoDb extends Contenedor {
	constructor() {
		super(modeloProductos);
	}
}

module.exports = productosDaoMongoDb;
