const faker = require('@faker-js/faker').faker;

const generateProduct = () => {
	return {
		nombre: faker.commerce.product(),
		categoria: faker.lorem.paragraph(),
		precio: faker.commerce.price(4000, 15000, 0),
		thumbnail: faker.image.technics(),
		stock: faker.commerce.price(1, 100, 0),
		codigo: faker.commerce.price(100, 700, 0),
		descripcion: faker.lorem.lines(1),
	};
};

module.exports = { generateProduct };
