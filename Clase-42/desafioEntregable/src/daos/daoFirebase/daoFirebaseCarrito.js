const Contenedor = require('../../services/contenedorFirebase');
const { queryCarrito, fieldValue } = require('../../DB/options/configFirebase');

class carritoDaoFirebase extends Contenedor {
	constructor() {
		super(queryCarrito, fieldValue);
	}
}

module.exports = carritoDaoFirebase;
