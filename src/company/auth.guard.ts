import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CompanyService } from './company.service';
import { AccountStatus } from './enum/status.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly companyService: CompanyService){}
 async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const companyEmail = request.company.email;

    const company = await this.companyService.findCompanyByEmail(companyEmail)
    if(company && company.account_status === AccountStatus.ACTIVE){
      return true
    }  
  
    return false;
  }

}
