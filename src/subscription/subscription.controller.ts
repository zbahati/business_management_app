import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { CompanyGuard } from 'src/company/company.guard';
import { CompanyDecorator } from 'src/company/company.decorator';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @UseGuards(CompanyGuard)
  @Post('pay')
  create(@Body() createSubscriptionDto: CreateSubscriptionDto, @CompanyDecorator() owner: number) {
    return this.subscriptionService.create(createSubscriptionDto, owner);
  }

}
