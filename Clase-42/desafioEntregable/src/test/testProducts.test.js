const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;
const { generateProduct } = require('../utils/faker');

describe('Test Products Endpoint', () => {
	describe('GET ALL', () => {
		it('deberia responder con status 200 y ser un array', async () => {
			const res = await request.get('/api/productos');
			expect(res.status).to.eql(200);
			expect(res.body).to.be.a('array');
		});
	});
	describe('GET BY ID', () => {
		it('deberia responder con status 200 y ser un objeto', async () => {
			const res = await request.get('/api/productos/640f333bfcedc576b657ab6b');
			expect(res.status).to.eql(200);
			expect(res.body).to.be.a('object');
		});
	});
	describe('GET BY CATEGORY', () => {
		it('deberia responder con status 200 y ser array', async () => {
			const res = await request.get('/api/productos/categoria/ps4');
			expect(res.status).to.eql(200);
			expect(res.body).to.be.a('array');
		});
	});
	describe('POST ONE', () => {
		it('deberia responder con status 201 e incorporar un producto', async () => {
			const product = generateProduct();

			const res = await request.post('/api/productos').send(product);
			expect(res.status).to.eql(201);
			expect(res.body).to.be.a('object');
			expect(res.body).to.include.keys(
				'nombre',
				'precio',
				'categoria',
				'thumbnail',
				'stock',
				'codigo',
				'descripcion'
			);
			expect(product.nombre).to.eql(res.body.nombre);
			expect(product.precio).to.eql(res.body.precio);
			expect(product.categoria).to.eql(res.body.categoria);
			expect(product.thumbnail).to.eql(res.body.thumbnail);
			expect(product.stock).to.eql(res.body.stock);
			expect(product.codigo).to.eql(res.body.codigo);
			expect(product.descripcion).to.eql(res.body.descripcion);
		});
	});
	describe('PUT BY ID', () => {
		it('deberia responder con status 200 y actualizar un producto por id', async () => {
			const product = generateProduct();

			const res = await request
				.put('/api/productos/640f333bfcedc576b657ab6b')
				.send(product);
			expect(res.status).to.eql(200);
			expect(res.body).to.be.a('object');
			expect(res.body).to.include.keys(
				'nombre',
				'precio',
				'categoria',
				'thumbnail',
				'stock',
				'codigo',
				'descripcion'
			);
			expect(product.nombre).to.eql(res.body.nombre);
			expect(parseInt(product.precio)).to.eql(res.body.precio);
			expect(product.categoria).to.eql(res.body.categoria);
			expect(product.thumbnail).to.eql(res.body.thumbnail);
			expect(parseInt(product.stock)).to.eql(res.body.stock);
			expect(parseInt(product.codigo)).to.eql(res.body.codigo);
			expect(product.descripcion).to.eql(res.body.descripcion);
		});
	});
	describe('DELETE BY ID', () => {
		it('deberia responder con status 200 y eliminar un objeto por id', async () => {
			const res = await request.delete(
				'/api/productos/640fda7b12aa1ca207942b24'
			);
			expect(res.status).to.eql(200);
			expect(res.body).to.be.a('object');
		});
	});
	describe('DELETE ALL', () => {
		it('deberia responder con status 200 y eliminar todos los productos del array', async () => {
			const res = await request.delete('/api/productos');
			expect(res.status).to.eql(200);
			expect(res.body).to.be.a('object');
		});
	});
});
