import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockoutDto } from './dto/create-stockout.dto';
import { UpdateStockoutDto } from './dto/update-stockout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stockout } from './entities/stockout.entity';
import { Repository } from 'typeorm';
import { StockinService } from 'src/stockin/stockin.service';
import { stockSummary } from 'src/stockin/stockSummary.interface';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class StockoutService {
  constructor(
    @InjectRepository(Stockout)
    private readonly stockoutRepository: Repository<Stockout>,
    private readonly stockInService: StockinService,
    private readonly productService: ProductService

  ){}
  async create(createStockoutDto: CreateStockoutDto, owner: any) {
    const product = await this.productService.findOne(createStockoutDto.product, owner)
    const productStockInSummary: stockSummary[] = await this.stockInService.findAllStockInSummary(owner);
    const productStockOutSummary: stockSummary[] = await this.findStockOutSummary(owner);

    const stockInSummary = productStockInSummary.find((productItem) => productItem.id === createStockoutDto.product);
    if(!stockInSummary){
      throw new NotFoundException("No Purchases transactions found, Please add purchases.")
    }

    const stockOutSummary = productStockOutSummary.find((productItem) => productItem.id === createStockoutDto.product);

    if(!stockOutSummary){
      if((createStockoutDto.quantity) > stockInSummary.total_quantity){
        throw new NotFoundException(`Insufficient stock level of ${stockInSummary.total_quantity} to complete the transaction`)
      }
    }else{
      if((createStockoutDto.quantity + stockOutSummary.total_quantity) > stockInSummary.total_quantity){
        throw new NotFoundException(`Insufficient stock level of ${stockInSummary.total_quantity -stockOutSummary.total_quantity} to complete the transaction`)
      }
    }

    const newStockOut = new Stockout({...createStockoutDto, total_price: createStockoutDto.price * createStockoutDto.quantity, product:product, company: owner });
    
    if(!newStockOut){
      throw new BadRequestException()
    }

    const stockOut = await this.stockoutRepository.save(newStockOut);
    return stockOut;
  }

  async findStockOutSummary(owner: any): Promise<stockSummary[]>{
    const stockOuts = await this.stockoutRepository.find({
      where: {
        company: {
          id: owner
        }
        
      },
      relations: ["company","product"]
    })

    if(!stockOuts){
      throw new NotFoundException("No Selling transaction made.")
    }

    const summary = stockOuts.reduce((prev, current) => {
      const {product, quantity, total_price} = current

      if(!prev[product.id]){
        prev[product.id] = {
          ...product,
          total_quantity: 0,
          total_price: 0
        }
      }

        prev[product.id].total_quantity += quantity
        prev[product.id].total_price += total_price

        return prev
      
    }, {} as Record<number, stockSummary>)

    return Object.values(summary)

  }
  

  findAll() {
    return `This action returns all stockout`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockout`;
  }

  update(id: number, updateStockoutDto: UpdateStockoutDto) {
    return `This action updates a #${id} stockout`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockout`;
  }
}
