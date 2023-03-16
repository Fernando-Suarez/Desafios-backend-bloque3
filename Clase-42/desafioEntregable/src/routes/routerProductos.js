const { Router } = require('express');
const {
	getProducts,
	getProductId,
	postProduct,
	putProduct,
	deleteProductId,
	getProductCategory,
	deleteAll,
} = require('../controller/controladorProductos');

const routerProductos = Router();

routerProductos.get('/', getProducts);
routerProductos.get('/:id', getProductId);
routerProductos.get('/categoria/:categoria', getProductCategory);
routerProductos.post('/', postProduct);
routerProductos.put('/:id', putProduct);
routerProductos.delete('/', deleteAll);
routerProductos.delete('/:id', deleteProductId);

module.exports = routerProductos;
