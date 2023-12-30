import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DataSource, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { UUID } from 'crypto';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { ProductPrice } from './entities/product-purchase-price.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { SupplierService } from 'src/supplier/supplier.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductPrice)
    private readonly supplierService: SupplierService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      // Check if the product with the given ID already exists
      const existingProduct = await this.productRepository.findOne({
        where: { id: createProductDto.id },
        relations: ['suppliers', 'purchasePrice'], // Specify the name of the relation property
      });

      if (existingProduct && createProductDto.id) {
        // Product with the given ID exists, update the quantity and create new price
        const newPrice = new ProductPrice();
        newPrice.price = createProductDto.purchasePrice;
        newPrice.timestamp = new Date();

        // Update the existing product quantity
        const existingQuantity = Number(existingProduct.quantity);

        // Perform the addition
        existingProduct.quantity = existingQuantity + createProductDto.quantity;
        // Add the new price entry to the existing purchasePrice array
        existingProduct.purchasePrice = [
          newPrice,
          ...existingProduct.purchasePrice,
        ];

        // Save the updated product
        await this.productRepository.save(existingProduct);
        return existingProduct;
      } else {
        // Product with the given ID doesn't exist, proceed with regular creation
        const product = plainToClass(Product, createProductDto);
        const suppliersPromises = createProductDto.suppliers.map(
          async (item) => {
            const supplier = await this.supplierService.findOne(item);
            if (!supplier) {
              throw new BadRequestException(
                `Supplier with ID ${item} not found`,
              );
            }
            return supplier;
          },
        );
        const suppliers = await Promise.all(suppliersPromises);

        // Create a new ProductPrice entry for the initial purchase
        // Create a new ProductPrice instance
        const initialPrice = new ProductPrice();
        initialPrice.price = createProductDto.purchasePrice;
        initialPrice.timestamp = new Date();

        // Set the purchasePrice array
        product.purchasePrice = [initialPrice];

        // Create a new product and associate it with the retrieved suppliers
        product.suppliers = suppliers;

        // Save the product to the database
        const savedProduct = await this.productRepository.save(product);
        return savedProduct;
      }
    } catch (error) {
      // Handle any errors that occur during the process
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
        relations: ['suppliers', 'purchasePrice'], // Specify the name of the relation property
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
