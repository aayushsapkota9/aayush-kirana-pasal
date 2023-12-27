import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplierBillService } from './supplier-bill.service';
import { CreateSupplierBillDto } from './dto/create-supplier-bill.dto';
import { UpdateSupplierBillDto } from './dto/update-supplier-bill.dto';

@Controller('supplier-bill')
export class SupplierBillController {
  constructor(private readonly supplierBillService: SupplierBillService) {}

  @Post()
  create(@Body() createSupplierBillDto: CreateSupplierBillDto) {
    return this.supplierBillService.create(createSupplierBillDto);
  }

  @Get()
  findAll() {
    return this.supplierBillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierBillService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierBillDto: UpdateSupplierBillDto) {
    return this.supplierBillService.update(+id, updateSupplierBillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierBillService.remove(+id);
  }
}
