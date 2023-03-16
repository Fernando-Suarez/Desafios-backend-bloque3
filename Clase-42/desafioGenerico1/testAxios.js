//levantar el servidor antes de probar el testing
const axios = require('axios');

const direccion = 'http://localhost:8080';

const fechaYHora = async () => {
	try {
		let resultado = await axios.get(direccion.data);
		console.log(resultado);
	} catch (error) {
		console.log('error', error);
	}
};

fechaYHora();
