import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtContanst } from 'src/company/constants';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private readonly jwt: JwtService){}

  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = await this.findUserByToken(request)
    try {
      const payload  = await this.jwt.verifyAsync(token, {
        secret: JwtContanst.JWT_SECRET
      })
      request['user'] = payload
    } catch  {
      throw new UnauthorizedException()
    }
    return true;
  }

  private async findUserByToken(request: Request){
    const token = request.cookies['user_token'];
    if(!token){
      throw new UnauthorizedException()
    }
    return token;
  }
}
