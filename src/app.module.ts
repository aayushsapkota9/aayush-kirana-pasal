import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillModule } from './bill/bill.module';

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
    }),
    BillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
