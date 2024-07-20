import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StockoutService } from './stockout.service';
import { CreateStockoutDto } from './dto/create-stockout.dto';
import { UpdateStockoutDto } from './dto/update-stockout.dto';
import { CompanyGuard } from 'src/company/company.guard';
import { AuthGuard } from 'src/company/auth.guard';
import { CompanyDecorator } from 'src/company/company.decorator';

@UseGuards(CompanyGuard, AuthGuard)
@Controller('stockout')
export class StockoutController {
  constructor(private readonly stockoutService: StockoutService) {}

  @Post()
  create(@Body() createStockoutDto: CreateStockoutDto, @CompanyDecorator() owner: number) {
    return this.stockoutService.create(createStockoutDto, owner);
  }

  @Get('summary')
  findStockOutSummary(@CompanyDecorator() owner: number){
    return this.stockoutService.findStockOutSummary(owner);
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
