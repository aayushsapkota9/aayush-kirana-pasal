import { Module } from '@nestjs/common';
import { SupplierBillService } from './supplier-bill.service';
import { SupplierBillController } from './supplier-bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierBill } from './entities/supplier-bill.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SupplierBill])],
  controllers: [SupplierBillController],
  providers: [SupplierBillService],
})
export class SupplierBillModule {}
