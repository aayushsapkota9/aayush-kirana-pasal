import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { CustomerModule } from './customer/customer.module';
import { SupplierBillModule } from './supplier-bill/supplier-bill.module';
import { CustomerBillModule } from './customer-bill/customer-bill.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'aayush-kirana-pasal-db',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ProductModule,
    SupplierModule,
    CustomerModule,
    SupplierBillModule,
    CustomerBillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
