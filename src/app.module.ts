import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
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
    UserModule, CompanyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
