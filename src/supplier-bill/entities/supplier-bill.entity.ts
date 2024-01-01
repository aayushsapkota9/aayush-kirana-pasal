import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { UUID } from 'crypto';

@Entity()
export class SupplierBill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  billNo: string;

  @Column()
  billDate: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.bills)
  @JoinColumn({ name: 'supplier_id' }) // Specify the foreign key column name
  supplier: Supplier;

  @ManyToMany(() => Product, (product) => product.supplierBill)
  @JoinTable()
  products: Product[];
}
