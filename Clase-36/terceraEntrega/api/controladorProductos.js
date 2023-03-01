const storage = require('../daos/index');
const contenedorProductos = storage().productos;

//* GET productos

const getProducts = async (req, res) => {
	const { username, admin } = req.user;
	const products = await contenedorProductos.getAll();
	res.render('main', {
		layout: 'productlist',
		products: products,
		username: username,
		admin: admin,
	});
};

//* GET productos por id

const getProductId = async (req, res) => {
	const user = req.user;
	const { id } = req.params;
	const productosId = await contenedorProductos.getById(id);
	if (productosId) {
		res.render('main', {
			layout: 'productoID',
			products: productosId,
			username: user.username,
			admin: user.admin,
			user,
		});
	} else {
		res.render('main', { layout: 'productoID', username: user.username });
	}
};

//* GET productos por categoria
const getProductCategory = async (req, res) => {
	const user = req.user;
	const { categoria } = req.params;
	const productos = await contenedorProductos.getAll();
	const productosFiltrados = productos.filter((product) => {
		if (product.categoria.toLowerCase() == categoria.toLowerCase()) {
			return product;
		}
	});
	res.render('main', {
		layout: 'productlist',
		products: productosFiltrados,
		username: user.username,
		user: user.toJSON(),
	});
};

//*POST Agrega un producto

const postProduct = async (req, res) => {
	const { body } = req;
	await contenedorProductos.save(body);
	res.redirect('/api/productos');
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
	if (updateProducto) res.json({ succes: true, producto: prod });
	else res.json({ error: true, msg: 'producto no encontrado' });
};

//*DELETE borrar por id

const deleteProductId = async (req, res) => {
	const { id } = req.params;
	const productoId = await contenedorProductos.getById(id);
	if (productoId !== null) {
		await contenedorProductos.deleteById(id);
		res.json({ succes: true, msg: 'Producto eliminado' });
	} else {
		res.json({ error: true, msg: 'Producto no encotrado' });
	}
};

module.exports = {
	getProducts,
	getProductId,
	postProduct,
	putProduct,
	deleteProductId,
	getProductCategory,
};
