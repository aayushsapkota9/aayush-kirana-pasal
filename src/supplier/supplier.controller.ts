import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ResponseMessage } from 'src/decorators/response.decorators';
import { SuccessMessage } from 'src/interfaces/common.interface';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ResponseMessage(SuccessMessage.CREATE, 'Supplier')
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  @ResponseMessage(SuccessMessage.FETCH, 'Supplier')
  findAll() {
    return this.supplierService.findAll();
  }

  @ResponseMessage(SuccessMessage.FETCH, 'Supplier')
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.supplierService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage(SuccessMessage.PATCH, 'Supplier')
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.update(+id, updateSupplierDto);
  }

  @Delete(':id')
  @ResponseMessage(SuccessMessage.DELETE, 'Supplier')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(+id);
  }
}
