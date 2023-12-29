import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UUID } from 'crypto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.productService.findOne(id);
  }
  @Get('find/:id')
  findBySupplier(@Param('id') id: UUID) {
    // Modify the findOne method to include a filter for the supplier ID
    return this.productService.findBySupplier(id);
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.productService.remove(id);
  }
}
