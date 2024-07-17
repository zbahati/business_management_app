import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

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

  @Post('user-logout')
  logout(@Res({passthrough: true}) response:Response){
    return this.userService.logout(response);
  }

}
