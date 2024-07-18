import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Company } from 'src/company/entities/company.entity';
import { SubscriptionCron } from './subscription.cron';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, Company])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionCron],
})
export class SubscriptionModule {}
