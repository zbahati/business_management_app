import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) { }
  async create(createProductDto: CreateProductDto, owner: any) {
    await this.findProductByName(createProductDto.name, owner);

    const newProduct = new Product({...createProductDto, company: owner})
    if(!newProduct){
      throw  new BadRequestException();
    }

    const product = await this.productRepository.save(newProduct)
    return product;

  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  private async findProductByName(name: string, owner: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        name: name,
        company: {
          id: owner
        }
      }
    })
    if (product) {
      throw new HttpException(`Product ${name} already created!`, HttpStatus.FOUND)
    }
    return product
  }
}
