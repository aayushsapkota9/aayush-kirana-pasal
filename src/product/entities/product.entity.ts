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
  OneToMany,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  suppliers: Supplier[];

  // // Product entity
  // @ManyToMany(() => Supplier, (supplier) => supplier.products)
  // @JoinTable()
  // supplierBill: SupplierBill[];
}
