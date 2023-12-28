import { SupplierBill } from 'src/supplier-bill/entities/supplier-bill.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'numeric' })
  quantity: number;

  @Column({ type: 'numeric' })
  purchasePrice: number;

  @Column({ type: 'numeric' })
  retailPrice: number;

  @Column({ type: 'numeric' })
  wholesalePrice: number;

  @ManyToMany(() => Supplier, (supplier) => supplier.products)
  @JoinTable()
  suppliers: number[];

  //Many Bills may come from many suppliers
  @ManyToMany(() => SupplierBill, (supplierBill) => supplierBill.products)
  bills: number[];
  // Product entity
  @ManyToOne(() => SupplierBill, (supplierBill) => supplierBill.products)
  @JoinColumn({ name: 'supplier_bill_id' }) // Use the correct foreign key column name
  supplierBill: number;
}
