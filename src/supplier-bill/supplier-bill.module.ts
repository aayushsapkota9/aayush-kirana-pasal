import { Module } from '@nestjs/common';
import { SupplierBillService } from './supplier-bill.service';
import { SupplierBillController } from './supplier-bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierBill } from './entities/supplier-bill.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierBill, Product])],
  controllers: [SupplierBillController],
  providers: [SupplierBillService, ProductService],
})
export class SupplierBillModule {}
