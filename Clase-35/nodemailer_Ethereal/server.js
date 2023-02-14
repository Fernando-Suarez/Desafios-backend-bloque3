const { createTransport } = require('nodemailer');
require('dotenv').config();

// Los datos de user y pass del objeto auth del transporte, los obtenemos de la cuenta de Ethereal que nos creamos.
const TEST_MAIL = 'shanelle8@ethereal.email';

const transporter = createTransport({
	host: process.env.HOST_ETHEREAL,
	port: process.env.PORT_ETHEREAL,
	auth: {
		user: TEST_MAIL,
		pass: process.env.PASS_ETHEREAL,
	},
});

//Prueba de crear html en una variable

const htmlTemplate = `<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>`;

// Configuramos las opciones de mail donde indicamos quién lo envía, a qué direcciones, el asunto del mail y el cuerpo del mismo (puede ser texto plano o HTML).
const mailOptions = {
	from: 'Servidor Node.js',
	to: TEST_MAIL,
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
