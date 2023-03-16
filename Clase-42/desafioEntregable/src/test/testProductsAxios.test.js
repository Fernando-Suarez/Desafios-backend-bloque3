const axios = require('axios');

//* get con axios

const getAllAxios = async () => {
	try {
		const res = await axios.get('http://localhost:8080/api/productos');
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

const getByIdAxios = async (id) => {
	try {
		const res = await axios.get(`http://localhost:8080/api/productos/${id}`);
		return res.data;
	} catch (error) {
		console.error(error);
	}
};

const getByCategoryAxios = async (category) => {
	try {
		const res = await axios.get(
			`http://localhost:8080/api/productos/categoria/${category}`
		);
		console.log(res.data);
	} catch (error) {
		console.error(error);
	}
};

//*post con axios
const modelProduct = {
	nombre: 'resident evil',
	precio: 1600,
	categoria: 'ps4',
	thumbnail: 'www.google.com',
	stock: 10,
	codigo: 656,
	descripcion: 'juegos de ps4',
};

const postProductAxios = async (product) => {
	try {
		const res = await axios.post(
			`http://localhost:8080/api/productos`,
			product
		);
		console.log(`El producto fue agregado con exito`);
	} catch (error) {
		console.error(error);
	}
};

//*put con axios

const updateByIdAxios = async (id, product) => {
	try {
		const res = await axios.put(
			`http://localhost:8080/api/productos/${id}`,
			product
		);
		console.log('producto actualizado con exito', res.data);
	} catch (error) {
		console.error(error);
	}
};

//*delete con axios

const deleteByIdAxios = async (id) => {
	try {
		const res = await axios.delete(`http://localhost:8080/api/productos/${id}`);
		console.log('producto eliminado con exito ', res.data);
	} catch (error) {
		console.error(error);
	}
};

const deleteAllAxios = async () => {
	try {
		await axios.delete('http://localhost:8080/api/productos/');
		console.log('Todos los productos fueron borrados con exito ');
	} catch (error) {
		console.error(error);
	}
};

// getAllAxios();
// getByIdAxios('64107200c400b5e7be4d2876');
// getByCategoryAxios('ps4');
// postProductAxios(modelProduct);
// updateByIdAxios('6411c436bf6ba88fee96cf0e', modelProduct);
// deleteByIdAxios('6411c436bf6ba88fee96cf0e');
// deleteAllAxios();
