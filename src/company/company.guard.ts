import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtContanst } from './constants';

@Injectable()
export class CompanyGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService){}

  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = await this.findCompanyByToken(request);
    try {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: JwtContanst.JWT_SECRET
    });

    request['company'] = payload;
      
    } catch {
      throw new UnauthorizedException()
    }
    return true;
  }
  
  private async findCompanyByToken(request: Request){
    const checkToken = request.cookies['jwt_token'];
    if(!checkToken){
      throw new UnauthorizedException()
    }

    return checkToken
  }

}
