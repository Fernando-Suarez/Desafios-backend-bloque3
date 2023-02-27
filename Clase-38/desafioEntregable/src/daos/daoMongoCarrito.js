const Contenedor = require('../services/contenedorMongo');
const modeloCarrito = require('../DB/models/modeloMongoCarrito');

class carritoDaoMongoDb extends Contenedor {
	constructor() {
		super(modeloCarrito);
	}
}

module.exports = carritoDaoMongoDb;
