import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockinDto } from './dto/create-stockin.dto';
import { UpdateStockinDto } from './dto/update-stockin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stockin } from './entities/stockin.entity';
import { Repository } from 'typeorm';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class StockinService {
  constructor(
    @InjectRepository(Stockin)
    private readonly stockinRepository: Repository<Stockin>,
    private readonly productService: ProductService
  ){}

  async create(createStockinDto: CreateStockinDto, owner: any) {
   const product=  await this.productService.findOne(createStockinDto.product, owner);

   const total_price = createStockinDto.price * createStockinDto.quantity;

    const newStockIn = new Stockin({...createStockinDto, total_price: total_price , product: product, company: owner});

    if(!newStockIn){
      throw new BadRequestException()
    }

    const stockIn = await this.stockinRepository.save(newStockIn);

    return stockIn;
  }

  async findAllStockInSummary(owner: any) {
    const stockIns = await this.stockinRepository.find({
      where: {
        company: {
          id: owner
        }
      },
      relations: ["company", "product"]
    })

    if(!stockIns){
      throw new NotFoundException("No Buying transaction you have made")
    }

    const summary = stockIns.reduce((prevData, currentData) => {
      const {product, quantity, total_price} = currentData;

      if(!prevData[product.id]){
        prevData[product.id] ={
          ...product,
          total_quantity: 0,
          total_price: 0
        }
      }

      prevData[product.id].total_quantity += quantity;
      prevData[product.id].total_price +=total_price;

      return prevData;
    },{})

    return Object.values(summary);
  }

  async findAll(owner: any){
    const stockIns = await this.stockinRepository.find({
      where: {
        company:{
          id: owner
        }
      },
      relations:['product']
    })

    if(!stockIns){
      throw new NotFoundException('Not purchase was made.')
    }
    return stockIns;
  }

  async findOne(id: number, owner: any) {

    const stockinProduct = await this.stockinRepository.findOne({
      where: {
        id: id,
        company: {
          id: owner
        }
      },

      relations: ["product"]
    })

    if(!stockinProduct){
      throw new NotFoundException(`Stock details on ID# ${id} not Found!`)
    }

    return stockinProduct;
  }

  async update(id: number, updateStockinDto: UpdateStockinDto, owner: any) {
    const product = await this.productService.findOne(updateStockinDto.product,owner);
    const stockInProduct = await this.findOne(id,owner);

    let total_price = stockInProduct.total_price;

    if(updateStockinDto.price){
      total_price = updateStockinDto.price * stockInProduct.quantity;
    }

    if(updateStockinDto.quantity){
      total_price = updateStockinDto.quantity * stockInProduct.price;
    }

    if(updateStockinDto.price && updateStockinDto.quantity){
      total_price = updateStockinDto.price * updateStockinDto.quantity;
    }

    const updatedStockinProduct = await this.stockinRepository.update(id,{...updateStockinDto,product: product, company: owner, total_price: total_price })
    if(!updatedStockinProduct){
      throw new BadRequestException()
    }

    const updatedStockIn = await this.findOne(id, owner)

    return updatedStockIn;
  }
}
