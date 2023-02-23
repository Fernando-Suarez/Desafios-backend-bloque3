const Contenedor = require('../contenedores/contenedorMongo');
const modeloOrdenes = require('../DB/models/modeloMongoOrdenes');

class ordenesDaoMongoDb extends Contenedor {
	constructor() {
		super(modeloOrdenes);
	}
}

module.exports = ordenesDaoMongoDb;
