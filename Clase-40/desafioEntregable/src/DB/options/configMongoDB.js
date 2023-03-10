const { connect, set } = require('mongoose');
const dotenv = require('dotenv').config();
const DB_MONGO_URL = process.env.DB_MONGO_URL;
const { logger } = require('../../utils/logger');
// const connectionMG = async () => {
// 	try {
// 		set('strictQuery', false);
// 		await connect(`${DB_MONGO_URL}`);
// 	} catch (error) {
// 		console.log(error);
// 		throw 'connection failded';
// 	}
// };
// const mongoDB = connectionMG();
class Database {
	static instance = null;

	constructor() {
		set('strictQuery', false);
		connect(DB_MONGO_URL)
			.then(() => logger.log('info', '✅ DB ON'))
			.catch((e) => logger.log('error', ` ❌ DB OFF ${e}`));
	}
	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}
}

const mongoDB = Database.getInstance();
const mongoDB2 = Database.getInstance();

// console.log(mongoDB === mongoDB2);

module.exports = { mongoDB };
