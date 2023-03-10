const carritoDaoMongoDb = require('./daoMongoCarrito');
const productosDaoMongoDb = require('./daoMongoProductos');
const mensajesDaoMongoDb = require('./daoMongoMensajes');
const ordenesDaoMongoDb = require('./daoMongoOrdenes');

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
