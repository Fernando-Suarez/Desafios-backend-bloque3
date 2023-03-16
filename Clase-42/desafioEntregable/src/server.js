//* modulos
const express = require('express');
const { engine } = require('express-handlebars');
const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');
const config = require('./config/config');
const session = require('express-session');
const passport = require('passport');

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

//*routes
app.use('/api/productos', routerProductos); //ponerle de nuevo la authentificacion
app.use('/api/carrito', checkAuthentication, routerCarrito);
app.use('/api/ordenes', checkAuthentication, routerOrdenes);
app.use('/auth', routerUsuarios);
app.use('/', checkAuthentication, routerVistasGeneral);

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
