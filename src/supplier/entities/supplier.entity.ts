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

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  // One supplier can have many bills
  @OneToMany(() => SupplierBill, (supplierBill) => supplierBill.supplier)
  bills: string[];

  // One supplier can have many products
  @ManyToMany(() => Product, (product) => product.suppliers)
  products: Product[];
}
