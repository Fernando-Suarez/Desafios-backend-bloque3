//mongo
const carritoDaoMongoDb = require('./daoMongo/daoMongoCarrito');
const productosDaoMongoDb = require('./daoMongo/daoMongoProductos');
const mensajesDaoMongoDb = require('./daoMongo/daoMongoMensajes');
const ordenesDaoMongoDb = require('./daoMongo/daoMongoOrdenes');
//firebase
const carritoDaoFirebase = require('./daoFirebase/daoFirebaseCarrito');
const productosDaoFirebase = require('./daoFirebase/daoFirebaseProductos');
const mensajesDaoFirebase = require('./daoFirebase/daoFirebaseMensajes');
const ordenesDaoFirebase = require('./daoFirebase/daoFirebaseOrdenes');

const getStore = () => {
	const storage = process.argv[2] || 'mongo';

	switch (storage) {
		case 'mongo':
			return {
				productos: new productosDaoMongoDb(),
				carrito: new carritoDaoMongoDb(),
				mensajes: new mensajesDaoMongoDb(),
				ordenes: new ordenesDaoMongoDb(),
			};
			break;
		case 'firebase':
			return {
				productos: new productosDaoFirebase(),
				carrito: new carritoDaoFirebase(),
				mensajes: new mensajesDaoFirebase(),
				ordenes: new ordenesDaoFirebase(),
			};
			break;
	}
};

module.exports = getStore;
