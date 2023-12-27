import { SupplierBill } from 'src/supplier-bill/entities/supplier-bill.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';

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

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  purchasePrice: number;

  @Column()
  retailPrice: number;

  @Column()
  wholesalePrice: number;

  // Many products can come from many suppliers
  @ManyToMany(() => Supplier, (supplier) => supplier.products)
  @JoinTable()
  suppliers: Supplier[];

  //Many Bills may come from many suppliers
  @ManyToMany(() => SupplierBill, (supplierBill) => supplierBill.products)
  bills: SupplierBill[];
}
