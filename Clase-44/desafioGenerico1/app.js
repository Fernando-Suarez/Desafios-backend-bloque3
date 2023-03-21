// desafio 1
// Crear un servidor basado en GraphQL que me permita administrar recordatorios.
// El mismo deberá permitirme realizar las siguientes operaciones:
// Agregar un recordatorio
// Ver todos los recordatorios
// Un recordatorio está compuesto por un título, una descripción, y un timestamp del momento en que fue creado.
// Verificar el correcto funcionamiento del servidor utilizando un script con fetch desde el navegador (se puede usar el ejemplo de clase).
// No es necesario realizar un servidor en capas, y se puede mantener la persistencia en memoria para simplificar el desafío y concentrarse en la parte de GraphQL.

//desafio 2
// Continuando con el desafío anterior, agregar lo necesario para que nuestro servidor soporte también las siguientes operaciones:
// Marcar un recordatorio como leído
// Eliminar todos los recordatorios marcados como leídos
// Verificar el correcto funcionamiento del servidor utilizando la herramienta GraphiQL

//solucion desafio 1
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const crypto = require('crypto');

const app = express();

//schema

const schema = buildSchema(`
    type Recordatorio {
        id: ID!
        titulo: String,
        descripcion: String,
        timestamp: Int,
        vista: Boolean        
    }
    input RecordatorioInput {
        titulo: String,
        descripcion: String,
        timestamp: Int,
        vista: Boolean
    }
    type Query {
        getRecordatorios(campo: String, valor: String): [Recordatorio]
    }
    type Mutation {
        createRecordatorio(datos: RecordatorioInput): Recordatorio
        updateRecordatorio(id: ID!, datos: RecordatorioInput): Recordatorio
        deleteRecordatorio(id: ID!): Recordatorio
      
    }
`);

//modelo
class Recordatorio {
	constructor(id, { titulo, descripcion, timestamp, vista }) {
		this.id = id;
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.timestamp = timestamp;
		this.vista = vista;
	}
}

//persistencia
const recordatoriosMap = {};

//*service

//getAll
const getRecordatorios = ({ campo, valor }) => {
	const Recordatorios = Object.values(recordatoriosMap);
	if (campo && valor) {
		return Recordatorios.filter((p) => p[campo] == valor);
	} else {
		return Recordatorios;
	}
};

//save

const createRecordatorio = ({ datos }) => {
	const id = crypto.randomBytes(10).toString('hex');
	const nuevoRecordatorio = new Recordatorio(id, datos);
	recordatoriosMap[id] = nuevoRecordatorio;
	return nuevoRecordatorio;
};

//updateById

const updateRecordatorio = ({ id, datos }) => {
	if (!recordatoriosMap[id]) {
		throw new Error('recordatorio not found');
	}
	const recordatorioActualizado = new Recordatorio(id, datos);
	recordatoriosMap[id] = recordatorioActualizado;
	return recordatorioActualizado;
};

//deleteById

const deleteRecordatorio = ({ id }) => {
	if (!recordatoriosMap[id]) {
		throw new Error('recordatorio not found');
	}
	const recordatorioBorrado = recordatoriosMap[id];
	delete recordatoriosMap[id];
	return recordatorioBorrado;
};

//deleteByVista

//middleware

app.use(
	'/recordatorio',
	graphqlHTTP({
		schema: schema,
		rootValue: {
			getRecordatorios,
			createRecordatorio,
			updateRecordatorio,
			deleteRecordatorio,
		},
		graphiql: true,
	})
);

const PORT = 8080;
app.listen(PORT, () =>
	console.log(`servirdor escuchado en http:/localhost:${PORT}`)
);
//fin desafio 1
