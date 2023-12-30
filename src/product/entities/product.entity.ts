import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { SupplierBill } from 'src/supplier-bill/entities/supplier-bill.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { ProductPrice } from './product-purchase-price.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'numeric' })
  quantity: number;

  @OneToMany(() => ProductPrice, (price) => price.product, { cascade: true })
  purchasePrice: ProductPrice[];

  @Column({ type: 'numeric' })
  retailPrice: number;

  @Column({ type: 'numeric' })
  wholesalePrice: number;

  @ManyToMany(() => Supplier, (supplier) => supplier.products)
  suppliers: Supplier[];

  @ManyToMany(() => Supplier, (supplier) => supplier.products)
  supplierBill: SupplierBill[];
}
