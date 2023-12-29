import { Module } from '@nestjs/common';
import { SupplierBillService } from './supplier-bill.service';
import { SupplierBillController } from './supplier-bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierBill } from './entities/supplier-bill.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierBill, Product])],
  controllers: [SupplierBillController],
  providers: [SupplierBillService],
})
export class SupplierBillModule {}
