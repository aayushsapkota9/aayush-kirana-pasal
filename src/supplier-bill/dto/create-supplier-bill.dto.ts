import {
  IsArray,
  ArrayNotEmpty,
  IsString,
  ValidateNested,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Product } from 'src/product/entities/product.entity';

export class CreateSupplierBillDto {
  @IsString()
  billNo: string;

  @IsString()
  billDate: string;

  @IsNumber()
  supplierId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  @ValidateNested({ each: true })
  products: Product[];

  @IsArray()
  @IsOptional()
  productIds: number[];
}
