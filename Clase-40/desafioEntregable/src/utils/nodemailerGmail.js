const { createTransport } = require('nodemailer');
const { logger } = require('../utils/logger');
require('dotenv').config();

// Los datos de user y pass del objeto auth del transporte, los obtenemos de la cuenta de Ethereal o gmail que nos creamos.
const TEST_MAIL = process.env.USER_GMAIL;

const transporter = createTransport({
	service: 'gmail',
	port: process.env.PORT_GMAIL,
	auth: {
		user: TEST_MAIL, //usuario que envia el mail
		pass: process.env.PASS_GMAIL,
	},
});

const mailOptionsPedidos = (detallePedido, user) => {
	const mailOptions = {
		from: process.env.USER_GMAIL,
		to: process.env.USER_GMAIL,
		subject: `Nuevo pedido de:${user.nombre} email:${user.username}`,

		html: `
		<h3>Nuevo pedido!</h3>
		<p> Datos del cliente:</p>
		<ul>
		<li> Nombre: ${user.nombre}</li>
		<li> Email: ${user.username}</li>
		<li> Teléfono: ${user.telefono}</li>
		<li> Direccion: ${user.direccion}</li>
		</ul>
		<p> Pedido: ${detallePedido.id}</p>
		<ul>
		${detallePedido.detallePedido}
		</ul>
	`,
	};
	return mailOptions;
};

const enviaMail = async (options) => {
	try {
		const info = await transporter.sendMail(options);
		logger.log('info', 'send mail succes');
	} catch (err) {
		logger.log('error', `error to send mail: ${err}`);
	}
};

module.exports = { enviaMail, mailOptionsPedidos };
