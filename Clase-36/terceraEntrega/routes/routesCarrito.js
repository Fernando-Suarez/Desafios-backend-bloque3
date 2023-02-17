import { Router } from 'express';

import {
	postCreateCart,
	deleteCartId,
	getProductsCart,
	postProductCartId,
	deleteCartProductId,
} from '../api/controladorCarrito.js';

const routerCarrito = Router();

routerCarrito.post('/', postCreateCart);
routerCarrito.delete('/:id', deleteCartId);
routerCarrito.get('/:id/productos', getProductsCart);
routerCarrito.post('/:id/productos', postProductCartId);
routerCarrito.delete('/:id/productos/:id_prod', deleteCartProductId);

export default routerCarrito;
