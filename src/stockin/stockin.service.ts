import { Injectable } from '@nestjs/common';
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
  async create(createStockinDto: CreateStockinDto) {
    
    return 'This action adds a new stockin';
  }

  findAll() {
    return `This action returns all stockin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockin`;
  }

  update(id: number, updateStockinDto: UpdateStockinDto) {
    return `This action updates a #${id} stockin`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockin`;
  }
}
