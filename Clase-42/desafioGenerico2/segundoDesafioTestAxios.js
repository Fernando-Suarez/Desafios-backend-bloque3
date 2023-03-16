const axios = require('axios');

const direccion = 'http://localhost:8080';

const verNumero = async () => {
	try {
		let resultado = await axios.post(direccion + '/ingreso', {
			numero: Math.random(),
		});
		console.log(resultado);
	} catch (error) {
		console.log(error);
	}
};
setInterval(verNumero, 2000);
verNumero();
