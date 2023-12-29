import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierBillDto } from './dto/create-supplier-bill.dto';
import { UpdateSupplierBillDto } from './dto/update-supplier-bill.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { SupplierBill } from './entities/supplier-bill.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class SupplierBillService {
  constructor(
    @InjectRepository(SupplierBill)
    private supplierBillRepository: Repository<SupplierBill>,
    private readonly productService: ProductService,
  ) {}
  async create(createSupplierBillDto: CreateSupplierBillDto) {
    try {
      const payload = plainToClass(
        CreateSupplierBillDto,
        createSupplierBillDto,
      );
      const data = payload.products.map(async (item) => {
        // const createdItem = await this.productService.create(item);
        // return createdItem.id;
      });
      const productIds = await Promise.all(data);
      // payload.productIds = productIds;
      const { products, ...others } = payload;
      return await this.supplierBillRepository.save(others);
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
      const payload = plainToClass(SupplierBill, updateSupplierBillDto);
      return await this.supplierBillRepository.update(id, payload);
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
