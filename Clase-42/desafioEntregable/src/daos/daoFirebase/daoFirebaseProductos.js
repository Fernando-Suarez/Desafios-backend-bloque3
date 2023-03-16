const Contenedor = require('../../services/contenedorFirebase');
const { queryProductos } = require('../../DB/options/configFirebase');

class productosDaoFirebase extends Contenedor {
	constructor() {
		super(queryProductos);
	}
}

module.exports = productosDaoFirebase;
