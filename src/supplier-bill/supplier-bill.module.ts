import { Module } from '@nestjs/common';
import { SupplierBillService } from './supplier-bill.service';
import { SupplierBillController } from './supplier-bill.controller';

@Module({
  controllers: [SupplierBillController],
  providers: [SupplierBillService],
})
export class SupplierBillModule {}
