const Contenedor = require('../../services/contenedorFirebase');
const { queryOrdenes } = require('../../DB/options/configFirebase');

class ordenesDaoFirebase extends Contenedor {
	constructor() {
		super(queryOrdenes);
	}
}

module.exports = ordenesDaoFirebase;
