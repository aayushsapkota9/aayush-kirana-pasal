import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';

@Entity()
export class SupplierBill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  billNo: string;

  @Column()
  billDate: string;

  // Many-to-One Relationship with Supplier
  // @ManyToOne(() => Supplier, (supplier) => supplier.bills)
  @JoinColumn({ name: 'supplier_id' })
  supplier: number;

  // One-to-Many Relationship with Product
  // @OneToMany(() => Product, (product) => product.supplierBill)
  @JoinColumn({ name: 'supplier_bill_id' })
  products: number[];
}
