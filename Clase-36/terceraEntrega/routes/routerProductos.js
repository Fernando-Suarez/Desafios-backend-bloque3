const { Router } = require('express');
const {
	getProducts,
	getProductId,
	postProduct,
	putProduct,
	deleteProductId,
	getProductCategory,
} = require('../api/controladorProductos');

const routerProductos = Router();

routerProductos.get('/', getProducts);
routerProductos.get('/:id', getProductId);
routerProductos.post('/', postProduct);
routerProductos.put('/:id', putProduct);
routerProductos.delete('/:id', deleteProductId);
routerProductos.get('/categoria/:categoria', getProductCategory);

module.exports = routerProductos;
