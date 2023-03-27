import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';

import { ProductsService } from './products.service';
import { Products } from './interfaces/products.interface';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Get()
  async getProducts(@Res() res): Promise<Products[]> {
    const productsList = await this.productService.getProducts();
    if (!productsList) throw new NotFoundException('Products Do Not Exists ');
    return res.status(HttpStatus.OK).json({ products: productsList });
  }

  @Get(':id')
  async getProduct(@Res() res, @Param('id') id: string): Promise<Products> {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product Does Not Exists');
    return res.status(HttpStatus.OK).json(product);
  }
  @Post()
  async createProduct(@Res() res, @Body() createProductDTO: CreateProductDto) {
    const productCreated = await this.productService.createProduct(
      createProductDTO,
    );
    if (!productCreated) throw new NotFoundException('Product Does Not Exists');
    return res.status(HttpStatus.OK).json(productCreated);
  }

  @Put(':id')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDto,
    @Param('id') id: string,
  ): Promise<Products> {
    const productUpdated = await this.productService.updateProduct(
      id,
      createProductDTO,
    );
    if (!productUpdated) throw new NotFoundException('Product Does Not Exists');
    return res.status(HttpStatus.OK).json(productUpdated);
  }

  @Delete(':id')
  async deleteProduct(@Res() res, @Param('id') id: string): Promise<Products> {
    const productDeleted = await this.productService.deleteProduct(id);
    if (!productDeleted) throw new NotFoundException('Product Does Not Exists');
    return res.status(HttpStatus.OK).json(productDeleted);
  }
}
