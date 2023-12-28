import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const payload = plainToClass(Product, createProductDto);
      const data = await this.productRepository.save(payload);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.productRepository.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const payload = plainToClass(Product, updateProductDto);
      return await this.productRepository.update(id, payload);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.productRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
