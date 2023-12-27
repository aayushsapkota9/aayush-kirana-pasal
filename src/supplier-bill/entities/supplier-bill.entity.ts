import { ArrayNotEmpty, IsArray } from 'class-validator';
import { Product } from 'src/product/entities/product.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
@Entity()
export class SupplierBill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  billNo: string;

  @Column()
  billDate: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.bills)
  supplier: Supplier;

  @IsArray()
  @ArrayNotEmpty()
  @OneToMany(() => Product, (product) => product.bills)
  product: Product[];
}
