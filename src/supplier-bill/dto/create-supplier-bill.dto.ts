import {
  IsArray,
  ArrayNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSupplierDto } from 'src/supplier/dto/create-supplier.dto';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

export class CreateSupplierBillDto {
  @IsString()
  billNo: string;

  @IsString()
  billDate: string;

  @ValidateNested()
  @Type(() => CreateSupplierDto)
  supplier: CreateSupplierDto;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[];
}
