const MongoStore = require('connect-mongo');
require('dotenv').config();
const SECRET_MONGO = process.env.SECRET_MONGO;
const DB_MONGO_URL = process.env.DB_MONGO_URL;

const configSessionMongo = {
	//*persistencia por mongo
	store: MongoStore.create({
		mongoUrl: `${DB_MONGO_URL}`,
		mongoOptions: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	}),
	//*----------------------------------
	secret: `${SECRET_MONGO}`,
	cookie: {
		httpOnly: false,
		secure: false,
		maxAge: 600000,
	},
	resave: false,
	saveUninitialized: false,
};

module.exports = configSessionMongo;
