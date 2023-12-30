// product.entity.ts

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
  @Exclude() // Exclude to avoid circular reference during serialization
  purchasePrice: ProductPrice[];

  @Column({ type: 'numeric' })
  retailPrice: number;

  @Column({ type: 'numeric' })
  wholesalePrice: number;

  @ManyToMany(() => Supplier, (supplier) => supplier.products)
  @JoinTable()
  suppliers: Supplier[];

  @ManyToMany(() => Supplier, (supplier) => supplier.products)
  @JoinTable()
  supplierBill: SupplierBill[];
}
