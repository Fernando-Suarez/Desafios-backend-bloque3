export class CreateProductDto {
  readonly nombre: string;
  readonly descripcion: string;
  readonly codigo: number;
  readonly thumbnail: string;
  readonly precio: number;
  readonly stock: number;
  readonly categoria: string;
}
