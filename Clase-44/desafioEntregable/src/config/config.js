const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
	path: path.resolve(process.cwd(), './src/.env'),
});

module.exports = {
	HOST: process.env.HOST,
	PORT: process.env.PORT || 8080,

	// mongo
	SECRET_MONGO: process.env.SECRET_MONGO,
	DB_MONGO_URL: process.env.DB_MONGO_URL,

	// enviroment
	NODE_ENV: process.env.NODE_ENV,

	// nodemailer gmail

	PORT_GMAIL: process.env.PORT_GMAIL,
	PASS_GMAIL: process.env.PASS_GMAIL,
	USER_GMAIL: process.env.USER_GMAIL,

	// twilio
	ACCOUNT_TWILIO: process.env.ACCOUNT_TWILIO,
	TOKEN_TWILIO: process.env.TOKEN_TWILIO,
	OWN_NUMBER: process.env.OWN_NUMBER,
	TEST_NUMBER: process.env.TEST_NUMBER,
};
