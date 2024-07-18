import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { UserGuard } from './user.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user-registration')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('user-login')
  login(@Body() loginUserDto: LoginUserDto, @Res({passthrough: true}) response: Response ){
    return this.userService.login(loginUserDto, response)
  }

  @UseGuards(UserGuard)
  @Post('user-logout')
  logout(@Res({passthrough: true}) response:Response){
    return this.userService.logout(response);
  }

}
