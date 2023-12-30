import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { ProductPrice } from './entities/product-purchase-price.entity';
import { SupplierService } from 'src/supplier/supplier.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Supplier, ProductPrice])],
  controllers: [ProductController],
  providers: [ProductService, SupplierService],
})
export class ProductModule {}
