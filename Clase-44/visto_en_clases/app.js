const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const crypto = require('crypto');

//Schema

const schema = buildSchema(`
  type Persona {
    id: ID!
    nombre: String,
    edad: Int
  }
  input PersonaInput {
    nombre: String,
    edad: Int
  }
  type Query {
    getPersona(id: ID!): Persona,
    getPersonas(campo: String, valor: String): [Persona],
  }
  type Mutation {
    createPersona(datos: PersonaInput): Persona
    updatePersona(id: ID!, datos: PersonaInput): Persona,
    deletePersona(id: ID!): Persona,
  }
`);

//Modelo

class Persona {
	constructor(id, { nombre, edad }) {
		this.id = id;
		this.nombre = nombre;
		this.edad = edad;
	}
}

//Persistencia

const personasMap = {};

//Service

//getAll
const getPersonas = ({ campo, valor }) => {
	const personas = Object.values(personasMap);
	if (campo && valor) {
		return personas.filter((p) => p[campo] == valor);
	} else {
		return personas;
	}
};

//getBy

const getPersona = ({ id }) => {
	if (!personasMap[id]) {
		throw new Error('Persona not found');
	}
	return personasMap[id];
};

//save

const createPersona = ({ datos }) => {
	const id = crypto.randomBytes(10).toString('hex');
	const nuevaPersona = new Persona(id, datos);
	personasMap[id] = nuevaPersona;
	return nuevaPersona;
};

//updateById

const updatePersona = ({ id, datos }) => {
	if (!personasMap[id]) {
		throw new Error('Persona not found');
	}
	const personaActualizada = new Persona(id, datos);
	return personaActualizada;
};

//deleteById

const deletePersona = ({ id }) => {
	if (!personasMap[id]) {
		throw new Error('Persona not found');
	}
	const personaBorrada = personasMap[id];
	delete personasMap[id];
	return personaBorrada;
};

const app = express();
//Middlewares

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		//root resolver contiene las funciones a publicar
		rootValue: {
			getPersonas,
			getPersona,
			createPersona,
			updatePersona,
			deletePersona,
		},
		graphiql: true,
	})
);

//servidor

const PORT = 8080;

app.listen(PORT, () =>
	console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
