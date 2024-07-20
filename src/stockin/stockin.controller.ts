import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StockinService } from './stockin.service';
import { CreateStockinDto } from './dto/create-stockin.dto';
import { UpdateStockinDto } from './dto/update-stockin.dto';
import { CompanyGuard } from 'src/company/company.guard';
import { AuthGuard } from 'src/company/auth.guard';
import { CompanyDecorator } from 'src/company/company.decorator';

@UseGuards(CompanyGuard, AuthGuard)
@Controller('stockin')
export class StockinController {
  constructor(private readonly stockinService: StockinService) {}

  @Post()
  create(@Body() createStockinDto: CreateStockinDto, @CompanyDecorator() owner: number) {
    return this.stockinService.create(createStockinDto,owner);
  }

  @Get('summary')
  findAllStockInSummary(@CompanyDecorator() owner: number) {
    return this.stockinService.findAllStockInSummary(owner);
  }

  @Get()
  findAll(@CompanyDecorator() owner: number){
    return this.stockinService.findAll(owner)
  }


  @Get(':id')
  findOne(@Param('id') id: string, @CompanyDecorator() owner: number) {
    return this.stockinService.findOne(+id, owner);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockinDto: UpdateStockinDto, @CompanyDecorator() owner: number) {
    return this.stockinService.update(+id, updateStockinDto, owner);
  }
  
}
