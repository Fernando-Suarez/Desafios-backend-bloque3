const Contenedor = require('../contenedores/contenedorMongo');
const modeloMensaje = require('../DB/models/modeloMongoMensajes');

class mensajesDaoMongoDb extends Contenedor {
	constructor() {
		super(modeloMensaje);
	}
}

module.exports = mensajesDaoMongoDb;
