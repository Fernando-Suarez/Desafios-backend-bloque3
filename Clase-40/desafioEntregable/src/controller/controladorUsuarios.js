const { logger } = require('../utils/logger');

function getLogin(req, res) {
	if (req.isAuthenticated()) {
		const { username, password } = req.user;
		const user = { username, password };
		res.render('main', { layout: 'index', username: user.username });
	} else {
		logger.log('info', 'Ruta: /auth/login  -  Metodo: GET');
		res.render('main', { layout: 'login' });
	}
}

function getSignup(req, res) {
	if (req.isAuthenticated()) {
		const { username, password } = req.user;
		res.redirect('/');
	} else {
		logger.log('info', 'Ruta: /auth/signup  -  Metodo: GET');
		res.render('main', { layout: 'signup' });
	}
}

function postLogin(req, res) {
	logger.log('info', 'Ruta: /auth/login  -  Metodo: POST');
	res.redirect('/');
}

function postSignup(req, res) {
	const { username } = req.user;
	// const user = { username, password };
	logger.log('info', 'Ruta: /auth/signup  -  Metodo: POST');
	res.render('main', { layout: 'index', username: username });
}

function getFaillogin(req, res) {
	logger.log('info', 'Ruta: /auth/faillogin  -  Metodo: GET');
	res.render('main', { layout: 'login-error' });
}

function getFailsignup(req, res) {
	logger.log('info', 'Ruta: /auth/failsignup  -  Metodo: GET');
	res.render('main', { layout: 'signup-error' });
}

function getLogout(req, res) {
	const user = req.user;
	req.session.destroy((err) => {
		if (!err) {
			logger.log('info', 'Ruta: /auth/logout  -  Metodo: GET');
			res.render('main', { layout: 'logout', username: user.username });
		} else {
			res.send({ status: 'Logout error', body: err });
		}
	});
}

const profileUser = (req, res) => {
	const userLog = req.user;
	res.render('main', {
		layout: 'profileUser',
		userLog: userLog.toJSON(),
		username: userLog.username,
		admin: userLog.admin,
	});
};

module.exports = {
	getLogin,
	getSignup,
	postLogin,
	postSignup,
	getFaillogin,
	getFailsignup,
	getLogout,
	profileUser,
};
