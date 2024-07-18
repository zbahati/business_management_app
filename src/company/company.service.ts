import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { LoginCompanyDto } from './dto/login_company.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { CompanyGuard } from './company.guard';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly jwt: JwtService
  ) { }

  async companyRegistration(createCompanyDto: CreateCompanyDto) {

     await this.findCompany(createCompanyDto.name, createCompanyDto.contact_email);

    const hash = bcrypt.hashSync(createCompanyDto.password, 10);
    const newCompany = new Company({ ...createCompanyDto, password: hash });

    if (!newCompany) {
      throw new BadRequestException();
    }

    const company = await this.companyRepository.save(newCompany);

    if (!company) {
      throw new HttpException("Company is failed to be created, try again", HttpStatus.BAD_REQUEST)
    }

    return company;
  }

  async companyLogin(loginCompanyDto: LoginCompanyDto, response: Response): Promise<{message: string}>{
    const company = await this.findCompanyByEmail(loginCompanyDto.email);
    const password = bcrypt.compareSync(loginCompanyDto.password,company.password);
    if(!password){
      throw new NotFoundException("Company Password is Incorrect!.")
    }

    const payload = {sub: company.id, email: company.contact_email };
    const access_token = await this.jwt.signAsync(payload);

    response.cookie('jwt_token', access_token)
    return {message: "Successfully Logged In"};
  }

  async companyLogout(response: Response){
    response.clearCookie('jwt_token')
    return {
      message: "Company is Logged out successfully."
    } 
  }

  async findAll() {
    const companies = await this.companyRepository.find();
    return companies;
  }

  async findCompanyByEmail(email: string){
    const checkEmail = await this.companyRepository.findOne({
      where: {
        contact_email: email
      }
    })

    if(!checkEmail){
      throw new NotFoundException("Company Email is unavailable")
    }

    return checkEmail;
  }


  private async findCompany(name: string, email: string) {
    const companyName = await this.companyRepository.findOne({
      where: [
        {name: name},
        {contact_email: email}

      ]
    });

    if(companyName){
      throw new HttpException("Company name already registered", HttpStatus.FOUND)
    }

    return companyName;
  }
}
