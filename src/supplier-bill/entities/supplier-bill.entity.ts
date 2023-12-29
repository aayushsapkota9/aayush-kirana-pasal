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

  @Column()
  supplierId: UUID;

  @ManyToMany(() => Product, (product) => product.supplierBill)
  @JoinTable()
  products: Product[];
}
