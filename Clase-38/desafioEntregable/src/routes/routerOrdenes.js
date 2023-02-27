const { Router } = require('express');

const { postOrder } = require('../controller/controladorOrdenes');

const routerOrdenes = Router();

// routerOrdenes.get('/', getOrder);
routerOrdenes.post('/', postOrder);

module.exports = routerOrdenes;
