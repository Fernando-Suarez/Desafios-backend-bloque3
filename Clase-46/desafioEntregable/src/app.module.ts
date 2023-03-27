import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb+srv://fernandosuarez:ywYAKiJLhdpdtMX7@cluster0.ye0zt3v.mongodb.net/ecommerce',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
