const { Router } = require('express');

const { postOrder } = require('../api/controladorOrdenes');

const routerOrdenes = Router();

// routerOrdenes.get('/', getOrder);
routerOrdenes.post('/', postOrder);

module.exports = routerOrdenes;
