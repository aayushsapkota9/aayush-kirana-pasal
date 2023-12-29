import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Repository, EntityNotFoundError } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { UUID } from 'crypto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto) {
    try {
      const payload = plainToClass(Supplier, createSupplierDto);
      return await this.supplierRepository.save(payload);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.supplierRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: UUID): Promise<Supplier> {
    try {
      const supplier = await this.supplierRepository.findOne({ where: { id } });
      if (!supplier) {
        throw new NotFoundException('Supplier not found.');
      } else {
        return supplier;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    try {
      const payload = plainToClass(Supplier, updateSupplierDto);
      return await this.supplierRepository.update(id, payload);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.supplierRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
