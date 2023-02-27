const { Router } = require('express');
const { formProductsAdmin, home } = require('../controller/controladorVistas');

const routerVistasGeneral = Router();

routerVistasGeneral.get('/', home);
routerVistasGeneral.get('/formAddProduct', formProductsAdmin);

module.exports = routerVistasGeneral;
