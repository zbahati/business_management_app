import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CompanyModule } from 'src/company/company.module';


@Module({
  imports: [CompanyModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
