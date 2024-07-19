import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/company/auth.guard';
import { CompanyGuard } from 'src/company/company.guard';
import { CompanyDecorator } from 'src/company/company.decorator';

@UseGuards(CompanyGuard,AuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @CompanyDecorator() owner: number) {
    return this.productService.create(createProductDto, owner);
  }

  @Get()
  findAll(@CompanyDecorator() owner: number) {
    return this.productService.findAll(owner);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CompanyDecorator() owner: number) {
    return this.productService.findOne(+id, owner);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @CompanyDecorator() owner: number) {
    return this.productService.update(+id, updateProductDto, owner);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CompanyDecorator() owner: number) {
    return this.productService.remove(+id, owner);
  }
} 
