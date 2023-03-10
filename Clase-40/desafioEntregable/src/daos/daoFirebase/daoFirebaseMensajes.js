const Contenedor = require('../../services/contenedorFirebase');
const { queryMensajes } = require('../../DB/options/configFirebase');

class mensajesDaoFirebase extends Contenedor {
	constructor() {
		super(queryMensajes);
	}
}

module.exports = mensajesDaoFirebase;
