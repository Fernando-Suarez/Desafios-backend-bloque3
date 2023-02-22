const socket = io();

//* dom
const chatForm = document.getElementById('chat-form');
const chatContainer = document.getElementById('chat-container');

//* funciones socket chat

const guardarMensaje = (e) => {
	const formData = new FormData(chatForm);
	const formValues = Object.fromEntries(formData);
	socket.emit('nuevo mensaje', formValues);
	return false;
};

const renderizadoMensajes = async (mensajes) => {
	const respond = await fetch('../views/layouts/chatMensajes.hbs');
	const template = await respond.text();
	const compiledTemplate = Handlebars.compile(template);
	const html = compiledTemplate({ mensajes });
	chatContainer.innerHTML = html;
};

//socket mensajes
socket.on('lista mensajes', (mensajes) => {
	renderizadoMensajes(mensajes);
});
