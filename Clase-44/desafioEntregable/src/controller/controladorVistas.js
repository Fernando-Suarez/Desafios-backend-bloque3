const { logger } = require('../utils/logger');

const home = (req, res) => {
	const user = req.user;
	logger.log('info', 'Ruta: / - Metodo: GET');
	res.render('main', {
		layout: 'index',
		username: user.username,
		admin: user.admin,
	});
};

const formProductsAdmin = (req, res) => {
	const user = req.user;
	res.render('main', {
		layout: 'saveProductAdmin',
		admin: user.admin,
		username: user.username,
	});
};

module.exports = { home, formProductsAdmin };
