import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Product } from 'src/product/entities/product.entity';
import { SupplierBill } from 'src/supplier-bill/entities/supplier-bill.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  address: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  phone: string;

  // One supplier can have many bills
  @IsArray()
  @OneToMany(() => SupplierBill, (supplierBill) => supplierBill.supplier)
  bills: SupplierBill[];

  // One supplier can have many products
  @IsArray()
  @ManyToMany(() => Product, (product) => product.suppliers)
  products: Product[];
}
