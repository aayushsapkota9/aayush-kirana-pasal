import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierBillDto } from './dto/create-supplier-bill.dto';
import { UpdateSupplierBillDto } from './dto/update-supplier-bill.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { SupplierBill } from './entities/supplier-bill.entity';
import { ProductService } from 'src/product/product.service';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class SupplierBillService {
  constructor(
    @InjectRepository(SupplierBill)
    private supplierBillRepository: Repository<SupplierBill>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async create(createSupplierBillDto: CreateSupplierBillDto) {
    try {
      const supplierBill = plainToClass(Supplier, createSupplierBillDto);
      const productsPromises = supplierBill.products.map(async (item) => {
        if (item.id) {
          const product = await this.productRepository.findOne({
            where: { id: item.id },
          });
          if (!product) {
            throw new BadRequestException(
              `Supplier with ID ${item.id} not found`,
            );
          }
          return product;
        } else {
          return await this.productRepository.save(item);
        }
      });
      const products = await Promise.all(productsPromises);

      supplierBill.products = products;
      return await this.supplierBillRepository.save(supplierBill);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.supplierBillRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<SupplierBill> {
    try {
      const supplier = await this.supplierBillRepository.findOne({
        // where: { id },
      });
      if (!supplier) {
        throw new NotFoundException('Supplier Bill not found.');
      } else {
        return supplier;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateSupplierBillDto: UpdateSupplierBillDto) {
    try {
      const supplierBill = plainToClass(SupplierBill, updateSupplierBillDto);
      return await this.supplierBillRepository.update(id, supplierBill);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.supplierBillRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
