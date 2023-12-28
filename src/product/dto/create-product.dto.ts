import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateProductDto {
  @PrimaryGeneratedColumn()
  @IsOptional()
  id?: number;

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

  @IsNumber()
  @IsOptional()
  suppliers?: number[];

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  bills?: number[];
}
