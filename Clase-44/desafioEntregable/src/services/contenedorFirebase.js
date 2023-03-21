const { db } = require('../DB/options/configFirebase');
class Contenedor {
	constructor(collection, fieldValue) {
		this.collection = collection;
		this.fieldValue = fieldValue;
	}

	// Metodos

	// save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.

	async save(objeto) {
		try {
			const guardar = await this.collection.add(objeto);
			if (guardar) {
				return { id: guardar.id, ...objeto };
			}
		} catch (error) {
			console.log(error);
			throw 'no se pudo guardar el producto';
		}
	}

	//  getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
	async getById(id) {
		try {
			const productoId = await this.collection.doc(id.toString()).get();

			if (productoId._createTime != undefined) {
				return { id: productoId.id, ...productoId.data() };
			} else {
				return null;
			}
		} catch (error) {
			console.log(error);
			throw 'producto no encontrado';
		}
	}

	// getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.

	async getAll() {
		try {
			const productos = await this.collection.get();
			if (productos) {
				const todosLosProductos = productos.docs.map((doc) => {
					return { id: doc.id, ...doc.data() };
				});
				return todosLosProductos;
			}
		} catch (error) {
			console.log(error);
			throw 'no se puede obtener los productos';
		}
	}

	//  deleteById(Number): void - Elimina del archivo el objeto con el id buscado.

	async deleteById(id) {
		try {
			const productoID = await this.collection.doc(id);
			if (productoID) {
				productoID.delete();
				return productoID;
			} else {
				return 'producto no encontrado';
			}
		} catch (error) {
			console.log(error);
			throw 'no se pudo eliminar el producto';
		}
	}

	async updateById(id, body) {
		try {
			const producto = await this.collection.doc(id.toString());
			if (producto) {
				producto.update({ ...body });
				const productoActualizado = await this.collection
					.doc(id.toString())
					.get();
				return { id: productoActualizado.id, ...productoActualizado.data() };
			} else {
				return 'producto no encontrado';
			}
		} catch (error) {
			console.log(error);
			throw 'no se puedo actualizar el producto';
		}
	}

	async deleteProductById(idC, idP) {
		try {
			const carrito = await this.collection.doc(idC.toString()).get();
			let borrarProducto = {};
			carrito.data().productos.map((producto) => {
				if (producto.id == idP) {
					borrarProducto = producto;
				}
			});
			await this.collection.doc(idC.toString()).update({
				productos: this.fieldValue.arrayRemove(borrarProducto),
			});
		} catch (error) {
			console.log(error);
			throw 'no se pudo borrar el archivo';
		}
	}
	async createCart(id) {
		try {
			const date = new Date();
			const fechaYHora = `[${date.toLocaleDateString()}] [${date.toLocaleTimeString()}]`;
			const nuevoCarrito = {
				timestamp: fechaYHora,
				productos: [],
			};
			const guardar = await this.collection
				.doc(id.toString())
				.create(nuevoCarrito);
		} catch (error) {
			console.log(error);
		}
	}
	async orderDetail(orden) {
		try {
			let id = orden.id;
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

module.exports = Contenedor;
