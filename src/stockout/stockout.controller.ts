import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockoutService } from './stockout.service';
import { CreateStockoutDto } from './dto/create-stockout.dto';
import { UpdateStockoutDto } from './dto/update-stockout.dto';

@Controller('stockout')
export class StockoutController {
  constructor(private readonly stockoutService: StockoutService) {}

  @Post()
  create(@Body() createStockoutDto: CreateStockoutDto) {
    return this.stockoutService.create(createStockoutDto);
  }

  @Get()
  findAll() {
    return this.stockoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockoutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockoutDto: UpdateStockoutDto) {
    return this.stockoutService.update(+id, updateStockoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockoutService.remove(+id);
  }
}
