const passport = require('passport');
const LocalStrategy = require('passport-local');
const { createHash, isValidPassword } = require('../utils/funcionesPassport');
const Usuarios = require('../DB/models/modeloMongoUsuarios');
const { enviaMail } = require('../utils/nodemailerGmail');

//*passport config LocalStrategy Login
const login = () => {
	passport.use(
		'login',
		new LocalStrategy((username, password, done) => {
			Usuarios.findOne({ username }, (err, user) => {
				if (err) {
					return done(err);
				}
				if (!user) {
					console.log(`User Not Found With Username ${username}`);
					return done(null, false);
				}
				if (!isValidPassword(user, password)) {
					console.log('Invalid Password');
					return done(null, false);
				}
				return done(null, user);
			});
		})
	);
};

//* passport config LocalStrategy Sign UP

const signUp = () => {
	passport.use(
		'signup',
		new LocalStrategy(
			{
				passReqToCallback: true,
			},
			(req, username, password, done) => {
				Usuarios.findOne({ username: username }, function (err, user) {
					if (err) {
						console.log('Error in SignUp: ' + err);
						return done(err);
					}

					if (user) {
						console.log('User already exists');
						return done(null, false);
					}

					const newUser = {
						username: username,
						password: createHash(password),
						telefono: req.body.telefono,
						edad: req.body.edad,
						direccion: req.body.direccion,
						nombre: req.body.nombre,
						avatar: req.file.filename,
						admin: true,
					};
					const mailOptions = {
						from: process.env.USER_GMAIL,
						to: process.env.USER_GMAIL,
						subject: `Nuevo registro`,
						html: `
						<h3>Nuevo registro de usuario!</h3>
						<p> Datos:</p>
						<ul>
						<li> Nombre: ${newUser.nombre}</li>
						<li> Email: ${newUser.username}</li>
						<li> Teléfono: ${newUser.telefono}</li>
						<li> Edad: ${newUser.edad}</li>
						<li> Direccion: ${newUser.direccion}</li>
						</ul>
					`,
					};
					Usuarios.create(newUser, (err, userWithId) => {
						if (err) {
							console.log('Error in Saving user: ' + err);
							return done(err);
						}
						console.log(user);
						enviaMail(mailOptions); //enviar el mail
						return done(null, userWithId);
					});
				});
			}
		)
	);
};

//* passport serializar y deserializar
const serializeUser = () => {
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});
};

const deserializeUser = () => {
	passport.deserializeUser((id, done) => {
		Usuarios.findById(id, done);
	});
};

module.exports = { login, signUp, serializeUser, deserializeUser };
