import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Company } from 'src/company/entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { Between, Repository } from 'typeorm';
import { AccountStatus } from 'src/company/enum/status.enum';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>
  ) { }

  async create(createSubscriptionDto: CreateSubscriptionDto, owner: any) {

    const company = await this.companyRepository.findOne({ where: { id: owner } })
    if (!company) {
      throw new UnauthorizedException("Invalid company credentials, please contact the admininstration")
    }

    const now = new Date();

    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(),1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth()+1, 0);

    const isSubscriptionExist = await this.subscriptionRepository.findOne({
      where: {
        company: {
          id: owner
        },
        created_at: Between(firstDayOfMonth, lastDayOfMonth)
      }, 
      relations: ['company']
    })

    if(isSubscriptionExist){
      throw new HttpException("Subscription for this month already exist ... ", HttpStatus.FOUND)
    }

    const subsc = new Subscription({ ...createSubscriptionDto, company: owner })

    if (!subsc) {
      throw new BadRequestException();
    }

    const subscription = await this.subscriptionRepository.save(subsc);
    company.account_status = [AccountStatus.ACTIVE]

    await this.companyRepository.save(company)

    return { subscription, company }

  }

  async checkSubscription(){
    const subscriptions = await this.subscriptionRepository.find({
      relations: {
        company: true
      }
    });

    const now = new Date()

    for(const subscription of subscriptions){
      const subscriptionDate = new Date(subscription.created_at);
      const monthLater = new Date(subscriptionDate.setMonth(subscriptionDate.getMonth()+1));
      
      if(now > monthLater){
        const company = subscription.company;
        company.account_status = [AccountStatus.PENDING];

        await this.companyRepository.save(company)
      }
    }
  }

}
