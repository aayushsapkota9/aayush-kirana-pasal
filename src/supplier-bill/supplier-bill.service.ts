import { Injectable } from '@nestjs/common';
import { CreateSupplierBillDto } from './dto/create-supplier-bill.dto';
import { UpdateSupplierBillDto } from './dto/update-supplier-bill.dto';

@Injectable()
export class SupplierBillService {
  create(createSupplierBillDto: CreateSupplierBillDto) {
    return 'This action adds a new supplierBill';
  }

  findAll() {
    return `This action returns all supplierBill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplierBill`;
  }

  update(id: number, updateSupplierBillDto: UpdateSupplierBillDto) {
    return `This action updates a #${id} supplierBill`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplierBill`;
  }
}
