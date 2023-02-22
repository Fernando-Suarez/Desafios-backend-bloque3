const storage = require('../daos/index');
const contenedorCarrito = storage().carrito;
const contenedorProductos = storage().productos;

//GET: '/' - trae la vista del carrito

// const viewCart = (req, res) => {
// 	const user = req.user;
// 	res.render('main', {
// 		layout: 'carrito',
// 		user: user,
// 		products: user.carrito,
// 		username: user.username,
// 		admin: user.admin,
// 	});
// };

// POST: '/' - Crea un carrito y devuelve su id.
const postCreateCart = async (req, res) => {
	const user = req.user;
	const date = new Date();
	const fechaYHora = `[${date.toLocaleDateString()}] [${date.toLocaleTimeString()}]`;
	const nuevoCarrito = {
		timestamp: fechaYHora,
		productos: [],
		_id: user._id,
	};
	const carritoID = await contenedorCarrito.save(nuevoCarrito);
	res.redirect('/api/productos');
};
// DELETE: '/:id' - Vacía un carrito y lo elimina.

const deleteCartId = async (req, res) => {
	const { id } = req.params;
	const borrarCarrito = await contenedorCarrito.deleteById(id);
	if (borrarCarrito) res.json({ succes: true, msg: 'carrito eliminado' });
	else res.json({ error: true, msg: 'Id carrito no encontrado' });
};

// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito

const getProductsCart = async (req, res) => {
	const id = req.user._id;
	const carritoId = await contenedorCarrito.getById(id);
	if (carritoId) {
		// res.json({ succes: true, productos: carritoId.productos });
		const user = req.user;
		res.render('main', {
			layout: 'carrito',
			products: carritoId.productos,
			username: user.username,
			admin: user.admin,
		});
	} else {
		res.json({ error: true, msg: 'Id carrito no encontrado' });
	}
};
// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto

const postProductCartId = async (req, res) => {
	const { idProduct } = req.body;
	const idUser = req.user._id;
	const carritoId = await contenedorCarrito.getById(idUser);
	if (!carritoId)
		return res.json({ error: true, msg: 'carrito no encontrado' });
	const producto = await contenedorProductos.getById(idProduct);

	if (!producto)
		return res.json({ error: true, msg: 'producto no encontrado' });
	carritoId.productos.push(producto);
	const productoAgregado = await contenedorCarrito.updateById(
		idUser,
		carritoId
	);
	res.redirect('/api/productos');
};

// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

const deleteCartProductId = async (req, res) => {
	try {
		// const { id, id_prod } = req.params;
		const id = req.user._id;
		const id_prod = req.body.idProduct;
		await contenedorCarrito.deleteProductById(id, id_prod);
		res.redirect('/api/carrito');
	} catch (error) {
		return res.json(`${error}`);
	}
};

module.exports = {
	postCreateCart,
	deleteCartId,
	getProductsCart,
	postProductCartId,
	deleteCartProductId,
	// viewCart,
};
