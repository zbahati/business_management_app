import { BadGatewayException, BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(owner: any) {
    const product = await this.productRepository.find({
      where:{
        company: {
          id: owner
        }
      }
    })

    if(!product){
      throw new NotFoundException(`No product created`)
    }
    return product;
  }

  async findOne(id: number, owner: any) {
    const product = await this.productRepository.findOne({
      where: {
        id: id,
        company: {
          id: owner
        }
      }
    })

    if(!product){
      throw new NotFoundException(`Product with ID# ${id} is not Found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto,owner: any) {
    await this.findOne(id,owner);
    const product = await this.productRepository.update(id,updateProductDto)
    if(!product){
      throw new BadGatewayException()
    }

    const updatedProduct = await this.findOne(id,owner);
    return {
      message: "Product updated successfully.",
      updatedProduct
    };
  }

  async remove(id: number, owner: any) {
    await this.findOne(id, owner);
    const productDeleted = await this.productRepository.delete(id);
    if(!productDeleted){
      throw new HttpException("Some thing went wrong, try again later!", HttpStatus.NO_CONTENT)
    }
    
    const products = await this.findAll(owner)
    return products;
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
