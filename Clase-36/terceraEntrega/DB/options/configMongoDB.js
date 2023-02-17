const { connect, set } = require('mongoose');
const dotenv = require('dotenv').config();
const DB_MONGO_URL = process.env.DB_MONGO_URL;
const connectionMG = async () => {
	try {
		set('strictQuery', false);
		await connect(`${DB_MONGO_URL}`);
	} catch (error) {
		console.log(error);
		throw 'connection failded';
	}
};
const mongoDB = connectionMG();
module.exports = { mongoDB };
