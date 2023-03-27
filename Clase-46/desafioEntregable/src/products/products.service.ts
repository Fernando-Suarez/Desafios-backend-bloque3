import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './interfaces/products.interface';
import { CreateProductDto } from './dto/create-product.dto';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('productos')
    private readonly productModel: Model<Products>,
  ) {}
  async getProducts(): Promise<Products[]> {
    const products = await this.productModel.find();
    return products;
  }
  async getProduct(id: string): Promise<Products> {
    const product = await this.productModel.findById(id);
    return product;
  }
  async createProduct(createProductDTO: CreateProductDto): Promise<Products> {
    const product = new this.productModel(createProductDTO);
    return await product.save();
  }
  async deleteProduct(id: string): Promise<Products> {
    const productDeleted = await this.productModel.findByIdAndDelete(id);
    return productDeleted;
  }
  async updateProduct(
    id: string,
    createProductDTO: CreateProductDto,
  ): Promise<Products> {
    const productUpdated = await this.productModel.findByIdAndUpdate(
      id,
      createProductDTO,
      { new: true },
    );
    return productUpdated;
  }
}
