import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ResponseMessage } from 'src/decorators/response.decorators';
import { SuccessMessage } from 'src/interfaces/common.interface';
import { UUID } from 'crypto';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  // @UsePipes(new ValidationPipe({ transform: true }))
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
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: UUID,
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
