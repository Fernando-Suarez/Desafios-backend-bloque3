import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'productos', schema: ProductsSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
