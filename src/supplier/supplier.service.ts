import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}
  create(createSupplierDto: CreateSupplierDto) {
    const tempSupplier = plainToClass(Supplier, createSupplierDto);
    return this.supplierRepository.save(tempSupplier);
  }

  findAll() {
    return this.supplierRepository.find();
  }

  findOne(id: number) {
    return this.supplierRepository.findOneBy({ id });
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const tempSupplier = plainToClass(Supplier, updateSupplierDto);
    return this.supplierRepository.update(id, tempSupplier);
  }

  remove(id: number) {
    return this.supplierRepository.delete(id);
  }
}
