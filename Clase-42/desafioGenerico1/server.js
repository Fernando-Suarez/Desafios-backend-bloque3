const { createServer } = require('http');
const port = 8080;
const server = createServer((req, res) => {
	res.end(JSON.stringify({ FyH: new Date().toLocaleString() }));
});

server.listen(port, () => {
	console.log(`Server on in port ${port}`);
});
