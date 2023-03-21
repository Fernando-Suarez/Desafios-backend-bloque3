const admin = require('firebase-admin');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const serviceAccount = require('./keyFirebase.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();
const fieldValue = FieldValue;
const queryProductos = db.collection('productos');
const queryCarrito = db.collection('carritos');
const queryOrdenes = db.collection('ordenes');
const queryMensajes = db.collection('mensajes');

module.exports = {
	queryProductos,
	queryCarrito,
	queryOrdenes,
	queryMensajes,
	fieldValue,
	db,
};
