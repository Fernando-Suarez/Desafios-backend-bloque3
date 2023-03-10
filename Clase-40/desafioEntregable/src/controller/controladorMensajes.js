const { logger } = require('../utils/logger');
const storage = require('../daos/factory');
const contenedorMensajes = storage().mensajes;

const enviarMensajesSocket = async (socket) => {
	try {
		const mensajes = await contenedorMensajes.getAll();
		socket.emit('lista mensajes', mensajes);
	} catch (error) {
		logger.log('error', 'no se pudieron enviar los mensajes');
	}
};

const guardarMensaje = async (nuevoMensaje) => {
	try {
		nuevoMensaje.fecha = new Date().toLocaleString();
		await contenedorMensajes.save({
			author: nuevoMensaje,
			text: nuevoMensaje.text,
			fecha: nuevoMensaje.fecha,
		});
		const mensajes = await contenedorMensajes.getAll();
	} catch (error) {
		logger.log('error', 'no se pudo guardar el mensaje');
	}
};

module.exports = { enviarMensajesSocket, guardarMensaje };
