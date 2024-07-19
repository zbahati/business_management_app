import { Injectable } from '@nestjs/common';
import { CreateStockinDto } from './dto/create-stockin.dto';
import { UpdateStockinDto } from './dto/update-stockin.dto';

@Injectable()
export class StockinService {
  create(createStockinDto: CreateStockinDto) {
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
