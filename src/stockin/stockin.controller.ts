import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockinService } from './stockin.service';
import { CreateStockinDto } from './dto/create-stockin.dto';
import { UpdateStockinDto } from './dto/update-stockin.dto';

@Controller('stockin')
export class StockinController {
  constructor(private readonly stockinService: StockinService) {}

  @Post()
  create(@Body() createStockinDto: CreateStockinDto) {
    return this.stockinService.create(createStockinDto);
  }

  @Get()
  findAll() {
    return this.stockinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockinDto: UpdateStockinDto) {
    return this.stockinService.update(+id, updateStockinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockinService.remove(+id);
  }
}
