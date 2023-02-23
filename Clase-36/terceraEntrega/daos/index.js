const carritoDaoMongoDb = require('../daos/daoMongoCarrito');
const productosDaoMongoDb = require('../daos/daoMongoProductos');
const mensajesDaoMongoDb = require('../daos/daoMongoMensajes');
const ordenesDaoMongoDb = require('../daos/daoMongoOrdenes');

const getStore = () => {
	const storage = 'mongoDB';

	switch (storage) {
		case 'mongoDB':
			return {
				productos: new productosDaoMongoDb(),
				carrito: new carritoDaoMongoDb(),
				mensajes: new mensajesDaoMongoDb(),
				ordenes: new ordenesDaoMongoDb(),
			};
			break;
	}
};

module.exports = getStore;
