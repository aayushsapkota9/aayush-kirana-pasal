import { SupplierBill } from 'src/supplier-bill/entities/supplier-bill.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

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

  @ManyToMany(() => SupplierBill, (supplierBill) => supplierBill.product)
  bills: SupplierBill[];
}
