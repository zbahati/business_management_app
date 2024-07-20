import { Injectable } from '@nestjs/common';
import { CreateStockoutDto } from './dto/create-stockout.dto';
import { UpdateStockoutDto } from './dto/update-stockout.dto';

@Injectable()
export class StockoutService {
  create(createStockoutDto: CreateStockoutDto) {
    return 'This action adds a new stockout';
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
