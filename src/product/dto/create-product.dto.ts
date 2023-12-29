import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateProductDto {
  @PrimaryGeneratedColumn()
  @IsOptional()
  id?: UUID;

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
  @IsUUID(undefined, { each: true }) // Ensure each item in the array is a valid UUID
  suppliers: string[];

  // @IsArray()
  // @ArrayNotEmpty()
  // @IsOptional()
  // bills?: string[];
}
