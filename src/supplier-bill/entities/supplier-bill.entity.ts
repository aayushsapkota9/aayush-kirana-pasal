import { Product } from 'src/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity()
export class SupplierBill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  billNo: string;

  @Column()
  billDate: string;

  @OneToMany(() => Product, (product) => product.bills)
  product: Product[];
}
