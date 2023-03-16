require('../DB/options/configMongoDB');
class Contenedor {
	constructor(modelo) {
		this.modelo = modelo;
	}

	// Metodos

	// save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.

	async save(producto) {
		try {
			const guardarProducto = await new this.modelo(producto).save();
			return guardarProducto;
		} catch (err) {
			console.log(err);
			throw 'No se pudo guardar el producto';
		}
	}

	//  getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
	async getById(id) {
		try {
			const productoId = await this.modelo.findOne({ _id: id }).lean();
			if (!productoId) {
				return null;
			} else {
				return productoId;
			}
		} catch (error) {
			console.log(error);
			throw 'no se puedo encontrar el producto';
		}
	}
	// getByCategory() - Returna los productos con la categoria pasada por parametro

	async getByCategory(categoria) {
		try {
			const productoCategoria = await this.modelo
				.find({
					categoria: categoria,
				})
				.lean();
			if (!productoCategoria) {
				return null;
			} else {
				return productoCategoria;
			}
		} catch (error) {
			console.log(error);
			throw 'no se pudo encontrar la categoria del producto';
		}
	}

	// getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.

	async getAll() {
		try {
			const productos = await this.modelo.find().lean();

			if (productos) {
				return productos;
			} else {
				return [];
			}
		} catch (err) {
			console.log(err);
			throw 'No se pudo obtener los productos';
		}
	}

	//  deleteById(Number): void - Elimina del archivo el objeto con el id buscado.

	async deleteById(id) {
		try {
			const borrarId = await this.modelo.deleteOne({ _id: id });
			if (borrarId) {
				return `El producto ${borrarId} se elimino con exito`;
			} else {
				return `El producto no se pudo eliminar o no existe`;
			}
		} catch (error) {
			console.log(error);
			throw 'no se puedo eliminar';
		}
	}
	// deleteAll(): void - Elimina todos los objetos presentes en el archivo.
	async deleteAll() {
		try {
			const borrarTodos = await this.modelo.deleteMany({});
			if (borrarTodos) return 'todos los productos fueron borrados';
			return 'no se pudo eliminar los productos';
		} catch (error) {
			console.log(error);
			throw 'no se pudo eliminar';
		}
	}

	async updateById(id, body) {
		try {
			const actualizarId = await this.modelo.updateOne(
				{ _id: id },
				{ $set: { ...body } }
			);
			if (actualizarId) {
				return `producto ${actualizarId} actualizado con exito`;
			} else {
				return 'no se pudo actualizar el producto';
			}
		} catch (error) {
			console.log(error);
		}
	}

	async deleteProductById(idC, idP) {
		try {
			const carritoId = await this.modelo.findOne({ _id: idC });
			let productoId = [];
			carritoId.productos.map((producto) => {
				if (producto._id != idP) {
					productoId.push(producto);
				} else {
					return 'el producto no existe';
				}
			});
			carritoId.productos = [];
			await carritoId.save();
			carritoId.productos = productoId;
			await carritoId.save();
		} catch (error) {
			console.log(error);
			throw 'no se pudo eliminar el producto';
		}
	}
	async createCart(id) {
		try {
			const date = new Date();
			const fechaYHora = `[${date.toLocaleDateString()}] [${date.toLocaleTimeString()}]`;
			const nuevoCarrito = {
				timestamp: fechaYHora,
				productos: [],
				_id: id,
			};
			await this.modelo(nuevoCarrito).save();
		} catch (error) {
			console.log(error);
		}
	}
	async orderDetail(orden) {
		try {
			let id = orden._id;
			let detallePedido = '';
			orden.productos.forEach((element) => {
				detallePedido += `
			    <li>UNIDADES: ${element.cantidad}. PRODUCTO: ${element.nombre}. CODIGO: ${element.codigo} </li>
			`;
			});
			return { detallePedido: detallePedido, id: id };
		} catch (error) {
			console.log(error);
		}
	}
}

// const contenedorMongoDb = new Contenedor(mongoDB, modeloMensaje);
module.exports = Contenedor;
