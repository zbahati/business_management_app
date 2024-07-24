import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockoutDto } from './dto/create-stockout.dto';
import { UpdateStockoutDto } from './dto/update-stockout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stockout } from './entities/stockout.entity';
import { Repository } from 'typeorm';
import { StockinService } from 'src/stockin/stockin.service';
import { stockSummary } from 'src/stockin/stockSummary.interface';
import { ProductService } from 'src/product/product.service';
import { CompanyDecorator } from 'src/company/company.decorator';

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
  
  async findAll(owner: any) {
    const stockouts = await this.stockoutRepository.find({
      where: {
        company:{id: owner}
      },
      relations: ["product"]
    })
    if(!stockouts){
      throw new NotFoundException("No sales transaction made.")
    }

    return stockouts
  }

  async findOne(id: number, owner: any) {
    const stockOutTransaction = await this.stockoutRepository.findOne({
      where: {
        id: id,
        company: {
          id: owner
        }
      },
      
      relations: ["product"]
    })

    if(!stockOutTransaction){
      throw new NotFoundException(`sales transction with ID# ${id} not found.`)
    }
    
    return stockOutTransaction;
  }

  async update(id: number, updateStockoutDto: UpdateStockoutDto, @CompanyDecorator() owner: number) {
    const stockOutTransaction = await this.findOne(id, owner);
    const product = await this.productService.findOne(updateStockoutDto.product??stockOutTransaction.product.id, owner);

    const productStockInSummary: stockSummary[] = await this.stockInService.findAllStockInSummary(owner);
    const productStockOutSummary: stockSummary[] = await this.findStockOutSummary(owner);

    const stockInSummary = productStockInSummary.find((productItem) => productItem.id === product.id);

    if (!stockInSummary) {
        throw new NotFoundException("No Purchases transactions found, Please add purchases.");
    }

    let availableStock = 0;
    let total_price = stockOutTransaction.total_price;
    const stockOutSummary = productStockOutSummary.find((productItem) => productItem.id === product.id);
    if(!stockOutSummary){
      throw new NotFoundException("No Sales transactions found, Please add sales.");
    }else{
      const currentStockOutQuantity = stockOutTransaction.quantity;
      const newStockOutQuantity = updateStockoutDto.quantity?? stockOutTransaction.quantity;
      const currentStockOutPrice =  updateStockoutDto.price?? stockOutTransaction.price;
      availableStock = stockInSummary.total_quantity - (stockOutSummary.total_quantity - currentStockOutQuantity)
      
      if(newStockOutQuantity > availableStock){
        throw new NotFoundException(`Insufficient stock quantity of ${availableStock} ${product.name}`)
      }

      total_price = newStockOutQuantity *  currentStockOutPrice
    }

    await this.stockoutRepository.update(id,{...updateStockoutDto, product: product, total_price: total_price});

    const updatedStockProduct = this.findOne(id, owner)

   return updatedStockProduct;

}


remove(id: number, owner: any) {
    return `This action removes a #${id} stockout`;
  }
}
