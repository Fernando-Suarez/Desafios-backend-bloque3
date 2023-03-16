require('dotenv').config();

const accountSid = process.env.ACCOUNT_TWILIO;
const authToken = process.env.TOKEN_TWILIO;
const client = require('twilio')(accountSid, authToken);

const enviarWhatsapp = async (body) => {
	await client.messages
		.create({
			body: body,
			from: 'whatsapp:+14155238886',
			to: 'whatsapp:+5492657356354',
		})
		.then((message) => console.log(message.sid));
};

module.exports = enviarWhatsapp;
