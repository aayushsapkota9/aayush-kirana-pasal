import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UUID } from 'crypto';
import { Supplier } from 'src/supplier/entities/supplier.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = plainToClass(Product, createProductDto);
      if (createProductDto.suppliers) {
        const suppliersPromises = createProductDto.suppliers.map(
          async (item) => {
            const [supplier] = await this.supplierRepository.find({
              where: { id: item },
            });
            if (!supplier) {
              throw new BadRequestException(
                `Supplier with ID ${item} not found`,
              );
            }
            return supplier;
          },
        );
        const suppliers = await Promise.all(suppliersPromises);

        // Create a new product and associate it with the retrieved suppliers
        product.suppliers = suppliers;

        // Save the product to the database
        const savedProduct = await this.productRepository.save(product);

        return savedProduct;
      } else {
        return await this.productRepository.save(product);
      }
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

  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
        relations: ['suppliers'], // Specify the name of the relation property
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return product;
    } catch (error) {
      throw error;
    }
  }
  async findBySupplier(id: UUID) {
    try {
      const product = await this.productRepository.findOne({
        relations: ['suppliers'], // Load the suppliers associated with the product
        where: {
          suppliers: {
            id: id,
          },
        },
      });

      return product || null;
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

  async remove(id: UUID) {
    try {
      return await this.productRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
