const storage = require('../daos/factory');
const contenedorOrdenes = storage().ordenes;
const contenedorCarrito = storage().carrito;
const { enviaMail, mailOptionsPedidos } = require('../utils/nodemailerGmail');
const enviarSMSTwilio = require('../utils/twilioSMS');
const enviarWhatsapp = require('../utils/twilioWhatsapp');

const postOrder = async (req, res) => {
	const user = req.user;
	const carritoId = await contenedorCarrito.getById(user._id);
	const date = new Date();
	const fechaYHora = `[${date.toLocaleDateString()}] [${date.toLocaleTimeString()}]`;
	const orden = {
		timestamp: fechaYHora,
		productos: carritoId.productos,
		email: user.username,
		entrega: user.direccion,
	};
	const guardarOrden = await contenedorOrdenes.save(orden);
	const detallePedido = await contenedorOrdenes.orderDetail(guardarOrden);

	enviaMail(mailOptionsPedidos(detallePedido, user));

	//!   se comenta para que no genere costos
	// enviarSMSTwilio();
	// enviarWhatsapp(`Nuevo pedido de:${user.nombre} email:${user.username}`);
	res.send(`orden de compra: ${detallePedido.id} generada con exito`);
};

module.exports = { postOrder };
