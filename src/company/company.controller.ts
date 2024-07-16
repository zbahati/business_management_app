import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { LoginCompanyDto } from './dto/login_company.dto';
import {  Response } from 'express';
import { CompanyGuard } from './company.guard';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post('registration')
  companyRegistration(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.companyRegistration(createCompanyDto);
  }

  @Post('login')
  companyLogin(@Body() loginCompanyDto: LoginCompanyDto, @Res({ passthrough: true }) response: Response): Promise<{
    message: string;
  }> {
    return this.companyService.companyLogin(loginCompanyDto, response)
  }

  @UseGuards(CompanyGuard)
  @Post('logout')
  companyLogout(@Res({passthrough: true}) response: Response){
    return this.companyService.companyLogout(response)
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }
}
