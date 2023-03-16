const { logger } = require('../utils/logger');
const storage = require('../daos/factory');
const contenedorProductos = storage().productos;

//* GET productos

const getProducts = async (req, res) => {
	// const { username, admin } = req.user;
	const products = await contenedorProductos.getAll();
	res.status(200).json(products);
	// res.render('main', {
	// 	layout: 'productlist',
	// 	products: products,
	// 	username: username,
	// 	admin: admin,
	// });
};

//* GET productos por id

const getProductId = async (req, res) => {
	// const user = req.user;
	const { id } = req.params;
	const productosId = await contenedorProductos.getById(id);
	if (productosId) {
		// res.render('main', {
		// 	layout: 'productoID',
		// 	products: productosId,
		// 	username: user.username,
		// 	admin: user.admin,
		// 	user,
		// });
		res.status(200).json(productosId);
	} else {
		// res.render('main', { layout: 'productoID', username: user.username });
		res.status(400).json({ error: true, msg: 'Producto no encontrado' });
	}
};

//* GET productos por categoria
const getProductCategory = async (req, res) => {
	// const user = req.user;
	const { categoria } = req.params;
	const productosFiltrados = await contenedorProductos.getByCategory(categoria);
	if (productosFiltrados) {
		// res.render('main', {
		// 	layout: 'productlist',
		// 	products: productosFiltrados,
		// 	username: user.username,
		// 	user: user,
		// 	admin: user.admin,
		// });
		res.status(200).json(productosFiltrados);
	} else {
		res.status(400).json({ error: true, msg: 'categoria no encontrada' });
	}
};

//*POST Agrega un producto

const postProduct = async (req, res) => {
	const { body } = req;
	await contenedorProductos.save(body);
	// res.redirect('/api/productos');
	res.status(201).json(body);
};

//*PUT actualiza por id

const putProduct = async (req, res) => {
	const { id } = req.params;
	const { nombre, descripcion, codigo, thumbnail, precio, stock, categoria } =
		req.body;
	const updateProducto = await contenedorProductos.updateById(id, {
		nombre,
		descripcion,
		codigo,
		thumbnail,
		precio,
		stock,
		categoria,
	});
	const prod = await contenedorProductos.getById(id);
	if (updateProducto) {
		// res.json({ succes: true, producto: prod });
		res.status(200).json(prod);
	} else {
		res.status(400).json({ error: true, msg: 'producto no encontrado' });
	}
};

//*DELETE borrar por id

const deleteProductId = async (req, res) => {
	const { id } = req.params;
	const productoId = await contenedorProductos.getById(id);
	if (productoId !== null) {
		await contenedorProductos.deleteById(id);
		res.status(200).json({ succes: true, msg: 'Producto eliminado' });
	} else {
		res.status(400).json({ error: true, msg: 'Producto no encotrado' });
	}
};
//*DELETE borrar todos los productos
const deleteAll = async (req, res) => {
	const deleteProducts = await contenedorProductos.deleteAll();
	if (!deleteProducts) {
		res
			.status(400)
			.json({ error: true, msg: 'no se pudo eliminar todos los productos' });
	} else {
		res
			.status(200)
			.json({ succes: true, msg: 'todos los productos fueron eliminados' });
	}
};

module.exports = {
	getProducts,
	getProductId,
	postProduct,
	putProduct,
	deleteProductId,
	getProductCategory,
	deleteAll,
};
