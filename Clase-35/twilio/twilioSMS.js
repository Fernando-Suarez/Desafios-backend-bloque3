require('dotenv').config();

const accountSid = process.env.ACCOUNT_TWILIO;
const authToken = process.env.TOKEN_TWILIO;
const client = require('twilio')(accountSid, authToken);

const enviarSMSTwilio = async () => {
	try {
		const message = await client.messages.create({
			body: 'primer sms con twilio', //process.argv[2] para pasarle el mensaje: ej node server.js "mensaje"
			messagingServiceSid: 'MG7856b1a13fe202692590091a422776f9',
			from: process.env.OWN_NUMBER, //process.argv[3] para pasarle el numero: ej node server.js "mensaje" telefono
			to: process.env.TEST_NUMBER,
		});
		console.log(message.sid);
	} catch (err) {
		console.log(err);
	}
};

enviarSMSTwilio();
