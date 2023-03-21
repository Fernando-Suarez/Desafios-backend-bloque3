const bCrypt = require('bcrypt');

//* funcion passport password validacion
const isValidPassword = (user, password) => {
	return bCrypt.compareSync(password, user.password);
};

//* funcion passport encryptar password
const createHash = (password) => {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

// //* funcion autentificacion
function checkAuthentication(req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/auth/login');
	}
}

module.exports = { isValidPassword, createHash, checkAuthentication };
