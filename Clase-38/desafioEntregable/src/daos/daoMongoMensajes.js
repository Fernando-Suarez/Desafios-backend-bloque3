const Contenedor = require('../services/contenedorMongo');
const modeloMensaje = require('../DB/models/modeloMongoMensajes');

class mensajesDaoMongoDb extends Contenedor {
	constructor() {
		super(modeloMensaje);
	}
}

module.exports = mensajesDaoMongoDb;
