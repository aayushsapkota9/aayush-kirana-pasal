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
    private readonly supplierService: SupplierService,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const product = plainToClass(Product, createProductDto);
      const suppliersPromises = createProductDto.suppliers.map(async (item) => {
        const supplier = await this.supplierService.findOne(item);
        if (!supplier) {
          throw new BadRequestException(`Supplier with ID ${item} not found`);
        }
        return supplier;
      });
      const suppliers = await Promise.all(suppliersPromises);

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
    } catch (error) {
      // Handle any errors that occur during the process
      throw error;
    }
  }
  async createAndUpdate(id: string, createProductDto: UpdateProductDto) {
    try {
      // Fetch the existing product
      const existingProduct = await this.productRepository.findOne({
        where: { id },
        relations: ['purchasePrice', 'suppliers'],
      });
      if (!existingProduct) {
        throw new BadRequestException(`Product with ID ${id} not found`);
      }
      const suppliersPromises = createProductDto.suppliers.map(async (item) => {
        const supplier = await this.supplierService.findOne(item);
        if (!supplier) {
          throw new BadRequestException(`Supplier with ID ${item} not found`);
        }
        return supplier;
      });
      const suppliers = await Promise.all(suppliersPromises);
      existingProduct.suppliers = suppliers;

      // Check if prices are different
      const latestPrice =
        existingProduct.purchasePrice?.[
          existingProduct.purchasePrice.length - 1
        ];

      if (
        Number.parseInt(latestPrice.price as any) !=
        createProductDto.purchasePrice
      ) {
        // Prices are different, create a new ProductPrice entry
        const newPrice = new ProductPrice();
        newPrice.price = Number(createProductDto.purchasePrice);
        newPrice.timestamp = new Date();

        // Update the existing product quantity and prices
        existingProduct.quantity =
          (Number(existingProduct.quantity) || 0) + createProductDto.quantity;

        // Overwrite the purchasePrice array
        existingProduct.purchasePrice = [
          ...existingProduct.purchasePrice,
          newPrice,
        ];

        existingProduct.wholesalePrice = createProductDto.wholesalePrice;
        existingProduct.retailPrice = createProductDto.retailPrice;
        existingProduct.name = createProductDto.name;
        // Save the updated product and the new price entry
        await this.productRepository.save(existingProduct);
      } else {
        // Prices are the same, update quantity
        existingProduct.wholesalePrice = createProductDto.wholesalePrice;
        existingProduct.retailPrice = createProductDto.retailPrice;
        existingProduct.quantity =
          (Number(existingProduct.quantity) || 0) + createProductDto.quantity;
        // Save the updated product

        await this.productRepository.save(existingProduct);
      }

      return existingProduct;
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

  async update(id: UUID, updateProductDto: UpdateProductDto) {
    try {
      // Check if the product exists
      const existingProduct = await this.productRepository.findOne({
        where: { id },
        relations: ['purchasePrice', 'suppliers'],
      });
      if (!existingProduct) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      const latestPrice =
        existingProduct.purchasePrice?.[
          existingProduct.purchasePrice.length - 1
        ];

      if (
        Number.parseInt(latestPrice.price as any) !=
        updateProductDto.purchasePrice
      ) {
        // Update the existing product quantity and prices
        existingProduct.quantity =
          (Number(existingProduct.quantity) || 0) + updateProductDto.quantity;
        existingProduct.retailPrice = updateProductDto.retailPrice;
        existingProduct.wholesalePrice = updateProductDto.wholesalePrice;
        existingProduct.name = updateProductDto.name;

        // Update the purchasePrice array
        existingProduct.purchasePrice[
          existingProduct.purchasePrice.length - 1
        ].price = updateProductDto.purchasePrice;

        // Save the updated product and the new price entry
        await this.productRepository.update(id, existingProduct);
      }

      // Apply the update
      await this.productRepository.update(id, existingProduct);

      // Optionally, you can reload the entity and return it
      // const updatedProduct = await this.productRepository.findOne(id);
      // return updatedProduct;

      return { success: true, message: 'Product updated successfully' };
    } catch (error) {
      // Handle any errors that occur during the process
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
