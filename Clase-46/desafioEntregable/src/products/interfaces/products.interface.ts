import { Document } from 'mongoose';
export interface Products extends Document {
  readonly nombre: string;
  readonly descripcion: string;
  readonly codigo: number;
  readonly thumbnail: string;
  readonly precio: number;
  readonly stock: number;
  readonly categoria: string;
}
