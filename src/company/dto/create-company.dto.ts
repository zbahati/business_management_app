import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AccountStatus } from "../enum/status.enum";

export class CreateCompanyDto {
    @IsNotEmpty({message: "Name shouldn't be empty"})
    @IsString({message: "Name should be a string"})
    name: string

    @IsNotEmpty({message: "Contact_email shouldn't be empty "})
    @IsString({message: "Contact_email should be string"})
    contact_email: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsOptional()
    account_status: AccountStatus
}
