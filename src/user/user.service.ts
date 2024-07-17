import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserGuard } from './user.guard';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const checkUser = await this.findUserByEmail(createUserDto.email);
    if (checkUser) {
      throw new HttpException("User Email Found", HttpStatus.FOUND);
    }

    const hashpassword = bcrypt.hashSync(createUserDto.password, 16);

    const newUser = new User({ ...createUserDto, password: hashpassword });

    if (!newUser) {
      throw new BadRequestException()
    }

    return this.userRepository.save(newUser);

  }

  async login(loginUserDto: LoginUserDto, response: Response) {
    const user = await this.findUserByEmail(loginUserDto.email);
    if (!user) {
      throw new NotFoundException("User email not Found")
    }

    const password = bcrypt.compareSync(loginUserDto.password, user.password);
    if (!password) {
      throw new UnauthorizedException()
    }

    const payload = {
      sub: user.id,
      email: user.email
    }

    const token = await this.jwtService.signAsync(payload);
    response.cookie("user_token", token)

    return {
      message: "User logged in successfully!."
    };

  }
 
  async logout(response: Response){
    response.clearCookie('user_token');
    return {
      message: "User logged out successfully!."
    }
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    })
    return user;
  }

}
