import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  purchasePrice: number;

  @IsNumber()
  @IsNotEmpty()
  retailPrice: number;

  @IsNumber()
  @IsNotEmpty()
  wholesalePrice: number;

  @IsArray()
  @ArrayNotEmpty()
  suppliers: number[];

  @IsArray()
  @ArrayNotEmpty()
  bills: number[];
}
