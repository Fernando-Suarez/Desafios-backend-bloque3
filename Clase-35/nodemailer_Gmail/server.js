const { createTransport } = require('nodemailer');
require('dotenv').config();

// Los datos de user y pass del objeto auth del transporte, los obtenemos de la cuenta de Ethereal que nos creamos.
const TEST_MAIL = process.env.USER_GMAIL;

const transporter = createTransport({
	// host: process.env.HOST_ETHEREAL,
	service: 'gmail',
	port: process.env.PORT_GMAIL,
	auth: {
		user: TEST_MAIL, //usuario que envia el mail
		pass: process.env.PASS_GMAIL,
	},
});

//Prueba de crear html en una variable

const htmlTemplate = `<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>`;

// Configuramos las opciones de mail donde indicamos quién lo envía, a qué direcciones, el asunto del mail y el cuerpo del mismo (puede ser texto plano o HTML).Podemos agregarle un archivo adjunto al mail que enviamos desde Node.
// Para eso, agregamos en el objeto mailOptions la clave de attachments y dentro la ruta del archivo a adjuntar.

const mailOptions = {
	from: 'Servidor Node.js',
	to: 'shanelle8@ethereal.email', //usuario que recibe el mail
	attachments: [
		{
			path: '../indice.png',
		},
	],
	subject: 'Mail de prueba desde Node.js',
	html: htmlTemplate,
};

// Para enviar finalmente el mail, utilizamos el método sendMail del transporter con las opciones como argumento. Este método devuelve una promesa.
const enviaMail = async () => {
	try {
		const info = await transporter.sendMail(mailOptions);
		console.log(info);
	} catch (err) {
		console.log(err);
	}
};

enviaMail();
