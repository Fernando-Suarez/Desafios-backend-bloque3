//* modulos
const express = require('express');
const { engine } = require('express-handlebars');
const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');
const config = require('./config/config');
const session = require('express-session');
const passport = require('passport');
//! desafioo graphql borrar despues de esta entrega
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const crypto = require('crypto');
//!

const app = express();
const { logger } = require('./utils/logger');
const configSessionMongo = require('./DB/options/configSessionMongo');
const { checkAuthentication } = require('./utils/funcionesPassport');
const {
	enviarMensajesSocket,
	guardarMensaje,
} = require('./controller/controladorMensajes');
const routerUsuarios = require('./routes/routesUsuarios');
const routerProductos = require('./routes/routerProductos');
const routerCarrito = require('./routes/routesCarrito');
const routerOrdenes = require('./routes/routerOrdenes');
const routerVistasGeneral = require('./routes/routerVistasInicial');
const HTTPserver = new HTTPServer(app);
const io = new IOServer(HTTPserver);

if (config.NODE_ENV != 'production') {
	require('dotenv').config();
}

//*config Handlebars
app.set('view engine', 'hbs');
app.set('views', './src/views');
app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		layoutsDir: './src/views/layouts',
		partialsDir: './src/views/layouts/partials',
	})
);

//* Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('./src/assets'));
app.use('/views', express.static('./src/views'));
app.use('/avatar', express.static(__dirname + '/public/avatar'));
app.use(session(configSessionMongo));
app.use(passport.initialize());
app.use(passport.session());

//! desafio graphql borrar despues de esta entrega
//schema

const schema = buildSchema(`
    type Producto {
        id: ID!
        nombre: String,
        precio: Int,
        categoria: String,
        thumbnail: String,
        stock: Int,
        codigo: Int,
        descripcion: String
           
    }
    input ProductoInput {
        nombre: String,
        precio: Int,
        categoria: String,
        thumbnail: String,
        stock: Int,
        codigo: Int,
        descripcion: String
    }
    type Query {
        getProductos(campo: String, valor: String): [Producto]
    }
    type Mutation {
        createProducto(datos: ProductoInput): Producto
        updateProducto(id: ID!, datos: ProductoInput): Producto
        deleteProducto(id: ID!): Producto
      
    }
`);

//modelo
class Producto {
	constructor(
		id,
		{ nombre, precio, categoria, thumbnail, stock, codigo, descripcion }
	) {
		this.id = id;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.precio = precio;
		this.categoria = categoria;
		this.thumbnail = thumbnail;
		this.stock = stock;
		this.codigo = codigo;
	}
}

//persistencia
const producto = {};

//*service

//getAll
const getProductos = ({ campo, valor }) => {
	const Productos = Object.values(producto);
	if (campo && valor) {
		return Productos.filter((p) => p[campo] == valor);
	} else {
		return Productos;
	}
};

//save

const createProducto = ({ datos }) => {
	const id = crypto.randomBytes(10).toString('hex');
	const nuevoProducto = new Producto(id, datos);
	producto[id] = nuevoProducto;
	return nuevoProducto;
};

//updateById

const updateProducto = ({ id, datos }) => {
	if (!producto[id]) {
		throw new Error('Producto not found');
	}
	const ProductoActualizado = new Producto(id, datos);
	producto[id] = ProductoActualizado;
	return ProductoActualizado;
};

//deleteById

const deleteProducto = ({ id }) => {
	if (!producto[id]) {
		throw new Error('Producto not found');
	}
	const ProductoBorrado = producto[id];
	delete producto[id];
	return ProductoBorrado;
};

//middleware

app.use(
	'/productos',
	graphqlHTTP({
		schema: schema,
		rootValue: {
			getProductos,
			createProducto,
			updateProducto,
			deleteProducto,
		},
		graphiql: true,
	})
);
//!

//*routes
app.use('/api/productos', routerProductos); //ponerle de nuevo la authentificacion
app.use('/api/carrito', checkAuthentication, routerCarrito);
app.use('/api/ordenes', checkAuthentication, routerOrdenes);
app.use('/auth', routerUsuarios);
app.use('/', routerVistasGeneral); // ponerle de nuevo la  authentificacion

//* sockets
io.on('connection', (socket) => {
	enviarMensajesSocket(socket);

	socket.on('nuevo mensaje', async (newMensaje) => {
		await guardarMensaje(newMensaje);
		enviarMensajesSocket(socket);
	});
});

//* Servidor
HTTPserver.listen(config.PORT, () => {
	logger.log(
		'info',
		`Servidor escuchado en el puerto http://${config.HOST}:${config.PORT}`
	);
});
