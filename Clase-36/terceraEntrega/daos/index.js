const carritoDaoMongoDb = require('../daos/daoMongoCarrito');
const productosDaoMongoDb = require('../daos/daoMongoProductos');
const mensajesDaoMongoDb = require('../daos/daoMongoMensajes');

const getStore = () => {
	const storage = 'mongoDB';

	switch (storage) {
		case 'mongoDB':
			return {
				productos: new productosDaoMongoDb(),
				carrito: new carritoDaoMongoDb(),
				mensajes: new mensajesDaoMongoDb(),
			};
			break;
	}
};

module.exports = getStore;
