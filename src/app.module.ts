import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtContanst } from './company/constants';
import { SubscriptionModule } from './subscription/subscription.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductModule } from './product/product.module';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JwtContanst.JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Bahati@123',
      database: 'cantineen',
      autoLoadEntities: true,
      synchronize: true      
    }),
    ScheduleModule.forRoot(),
    UserModule, CompanyModule, SubscriptionModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
