const passport = require('passport');
const { Router } = require('express');
const { upload } = require('../utils/multer');
const { postCreateCart } = require('../controller/controladorCarrito');
const {
	getLogin,
	getSignup,
	postLogin,
	postSignup,
	getFaillogin,
	getFailsignup,
	getLogout,
	profileUser,
} = require('../controller/controladorUsuarios');

const {
	login,
	signUp,
	serializeUser,
	deserializeUser,
} = require('../services/passport');

login();
signUp();
serializeUser();
deserializeUser();

const routerUsuarios = Router();

routerUsuarios.get('/login', getLogin);
routerUsuarios.post(
	'/login',
	passport.authenticate('login', { failureRedirect: '/faillogin' }),
	postLogin
);
routerUsuarios.get('/faillogin', getFaillogin);
routerUsuarios.get('/signup', getSignup);
routerUsuarios.post(
	'/signup',
	upload.single('avatar'),
	passport.authenticate('signup', { failureRedirect: '/failsignup' }),
	postCreateCart,
	postSignup
);
routerUsuarios.get('/failsignup', getFailsignup);
routerUsuarios.get('/logout', getLogout);
routerUsuarios.get('/profile', profileUser);

module.exports = routerUsuarios;
