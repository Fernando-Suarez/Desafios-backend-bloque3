const { Router } = require('express');

const {
	postCreateCart,
	deleteCartId,
	getProductsCart,
	postProductCartId,
	deleteCartProductId,
} = require('../api/controladorCarrito');

const routerCarrito = Router();

routerCarrito.get('/', getProductsCart);
// routerCarrito.post('/', postCreateCart);
routerCarrito.delete('/:id', deleteCartId);
// routerCarrito.get('/:id/productos', getProductsCart);
routerCarrito.post('/addProduct', postProductCartId);
routerCarrito.post('/deleteProduct', deleteCartProductId);
// routerCarrito.post('/:id/productos', postProductCartId);
// routerCarrito.delete('/:id/productos/:id_prod', deleteCartProductId);

module.exports = routerCarrito;
