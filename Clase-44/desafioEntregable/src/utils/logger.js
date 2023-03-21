const winston = require('winston');

const logger = winston.createLogger({
	level: 'warn',
	transports: [
		new winston.transports.Console({ level: 'info' }),
		new winston.transports.File({
			filename: './src/logs/warn.log',
			level: 'warn',
		}),
		new winston.transports.File({
			filename: './src/logs/error.log',
			level: 'error',
		}),
		new winston.transports.File({ filename: './src/logs/info', level: 'info' }),
	],
});

module.exports = { logger };
