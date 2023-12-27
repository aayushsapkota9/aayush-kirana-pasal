import { SupplierBill } from 'src/supplier-bill/entities/supplier-bill.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsNumber,
} from 'class-validator';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  purchasePrice: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  retailPrice: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  wholesalePrice: number;

  // Many products can come from many suppliers
  @IsArray()
  @ManyToMany(() => Supplier, (supplier) => supplier.products)
  @JoinTable()
  suppliers: Supplier[];

  //Many Bills may come from many suppliers
  @IsArray()
  @ManyToMany(() => SupplierBill, (supplierBill) => supplierBill.product)
  bills: SupplierBill[];
}
