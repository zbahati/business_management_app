import { IsNotEmpty, IsString } from "class-validator"

export class LoginCompanyDto{
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}