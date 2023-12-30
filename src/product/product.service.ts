import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
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
    private readonly productPriceRepository: Repository<ProductPrice>,
    private readonly supplierService: SupplierService, // Inject the SupplierService
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      // Check if the product with the given ID already exists
      const existingProduct = await this.productRepository.findOne({
        where: { id: createProductDto.id },
        relations: ['suppliers'], // Specify the name of the relation property
      });
      console.log(existingProduct, 'existing product');

      if (false) {
        // Product with the same ID already exists

        // Check if prices are different
        const latestPrice = existingProduct.purchasePrice?.[0]; // Assuming prices are stored in descending order of timestamp

        if (
          !latestPrice ||
          latestPrice.price !== createProductDto.purchasePrice
        ) {
          // Prices are different, create a new ProductPrice entry
          const newPrice = new ProductPrice();
          newPrice.price = createProductDto.purchasePrice;
          newPrice.timestamp = new Date();
          newPrice.product = existingProduct;

          // Update the existing product quantity and prices
          existingProduct.quantity += createProductDto.quantity;
          existingProduct.purchasePrice = [newPrice]; // Overwrite the purchasePrice array

          // Save the updated product and the new price entry
          await this.productRepository.save(existingProduct);

          return existingProduct;
        } else {
          // Prices are the same, update the quantity only
          existingProduct.quantity += createProductDto.quantity;

          // Save the updated product
          return await this.productRepository.save(existingProduct);
        }
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
        // Create a new ProductPrice entry for the initial purchase
        const initialPrice = new ProductPrice();
        initialPrice.price = createProductDto.purchasePrice;
        initialPrice.timestamp = new Date();
        initialPrice.product = product;
        const suppliers = await Promise.all(suppliersPromises);

        // Create a new product and associate it with the retrieved suppliers
        product.suppliers = suppliers;
        product.purchasePrice = [initialPrice];

        console.log(product);

        // Save the product to the database
        // const savedProduct = await this.productRepository.save(product);

        // return savedProduct;
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
