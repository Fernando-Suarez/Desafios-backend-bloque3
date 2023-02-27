const { createTransport } = require('nodemailer');
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

const enviaMail = async (options) => {
	try {
		const info = await transporter.sendMail(options);
		console.log(info);
	} catch (err) {
		console.log(err);
	}
};

module.exports = enviaMail;
