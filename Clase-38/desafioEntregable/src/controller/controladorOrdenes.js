const storage = require('../daos/index');
const contenedorOrdenes = storage().ordenes;
const contenedorCarrito = storage().carrito;
const enviaMail = require('../utils/nodemailerGmail');
const enviarSMSTwilio = require('../utils/twilioSMS');
const enviarWhatsapp = require('../utils/twilioWhatsapp');

// const getOrder = async (req, res) => {};

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

	let detallePedido = '';
	guardarOrden.productos.forEach((element) => {
		detallePedido += `
        <li>UNIDADES: ${element.cantidad}. PRODUCTO: ${element.nombre}. CODIGO: ${element.codigo} </li>
    `;
	});

	const mailOptions = {
		from: process.env.USER_GMAIL,
		to: process.env.USER_GMAIL,
		subject: `Nuevo pedido de:${user.nombre} email:${user.username}`,
		html: `
			<h3>Nuevo pedido!</h3>
			<p> Datos del cliente:</p>
			<ul>
			<li> Nombre: ${user.nombre}</li>
			<li> Email: ${user.username}</li>
			<li> Teléfono: ${user.telefono}</li>
			<li> Direccion: ${user.direccion}</li>
			</ul>
			<p> Pedido: ${guardarOrden._id}</p>
			<ul>
			${detallePedido}
			</ul>
		`,
	};

	enviaMail(mailOptions);
	enviarSMSTwilio();
	enviarWhatsapp(`Nuevo pedido de:${user.nombre} email:${user.username}`);
	res.send(`orden de compra: ${guardarOrden._id} generada con exito`);
};

module.exports = { postOrder };
