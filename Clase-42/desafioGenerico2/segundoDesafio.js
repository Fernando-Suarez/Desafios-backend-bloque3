const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());

const numeros = [];

app.post('/ingreso', (req, res) => {
	const { numero } = req.body;
	numeros.push(numero);
	res.send(`Numero ${numero} cargado`);
});

app.get('/egreso', (req, res) => {
	res.json({ numeros });
});

app.listen(port, () => {
	console.log(`Servidor levantado en el puerto ${port}`);
});
