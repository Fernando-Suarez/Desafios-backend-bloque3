import { Schema } from 'mongoose';
export const ProductsSchema = new Schema({
  nombre: { type: String, required: true, max: 200 },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  thumbnail: { type: String, required: true },
  stock: { type: Number, required: true },
  codigo: { type: Number, required: true },
  descripcion: { type: String, required: true },
});
