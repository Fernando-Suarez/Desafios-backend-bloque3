// Realizar las modificaciones para que el servidor desarrollado en los desafíos anteriores presente una correcta separación en capas. Esto debe incluir:
// La capa de ruteo (donde se levanta el servidor express)
// Los controladores (quienes conectan los root resolvers con los métodos de la api)
// La lógica de negocio (donde se realizan las validaciones y se interactua con la capa de persistencia)
// Los modelos (dentro de ellos se realizan las validaciones)
// La capa de persistencia (utilizando adecuadamente DAOs y DTOs, según corresponda, pero persistiendo aún en memoria)

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const crypto = require('crypto');

const app = express();

//schema

const schema = buildSchema(`
    type Producto {
        id: ID!
        nombre: String,
        precio: Int,
        categoria: String,
        thumbnail: String,
        stock: Int,
        codigo: Int,
        descripcion: String
           
    }
    input ProductoInput {
        nombre: String,
        precio: Int,
        categoria: String,
        thumbnail: String,
        stock: Int,
        codigo: Int,
        descripcion: String
    }
    type Query {
        getProductos(campo: String, valor: String): [Producto]
    }
    type Mutation {
        createProducto(datos: ProductoInput): Producto
        updateProducto(id: ID!, datos: ProductoInput): Producto
        deleteProducto(id: ID!): Producto
      
    }
`);

//modelo
class Producto {
	constructor(
		id,
		{ nombre, precio, categoria, thumbnail, stock, codigo, descripcion }
	) {
		this.id = id;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.precio = precio;
		this.categoria = categoria;
		this.thumbnail = thumbnail;
		this.stock = stock;
		this.codigo = codigo;
	}
}

//persistencia
const producto = {};

//*service

//getAll
const getProductos = ({ campo, valor }) => {
	const Productos = Object.values(producto);
	if (campo && valor) {
		return Productos.filter((p) => p[campo] == valor);
	} else {
		return Productos;
	}
};

//save

const createProducto = ({ datos }) => {
	const id = crypto.randomBytes(10).toString('hex');
	const nuevoProducto = new Producto(id, datos);
	producto[id] = nuevoProducto;
	return nuevoProducto;
};

//updateById

const updateProducto = ({ id, datos }) => {
	if (!producto[id]) {
		throw new Error('Producto not found');
	}
	const ProductoActualizado = new Producto(id, datos);
	producto[id] = ProductoActualizado;
	return ProductoActualizado;
};

//deleteById

const deleteProducto = ({ id }) => {
	if (!producto[id]) {
		throw new Error('Producto not found');
	}
	const ProductoBorrado = producto[id];
	delete producto[id];
	return ProductoBorrado;
};

//middleware

app.use(
	'/producto',
	graphqlHTTP({
		schema: schema,
		rootValue: {
			getProductos,
			createProducto,
			updateProducto,
			deleteProducto,
		},
		graphiql: true,
	})
);

const PORT = 8080;
app.listen(PORT, () =>
	console.log(`servirdor escuchado en http:/localhost:${PORT}`)
);
//fin desafio 1
