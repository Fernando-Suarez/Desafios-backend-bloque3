const Contenedor = require('../../services/contenedorMongo');
const modeloProductos = require('../../DB/models/modeloMongoProductos');

class productosDaoMongoDb extends Contenedor {
	constructor() {
		super(modeloProductos);
	}
}

module.exports = productosDaoMongoDb;
