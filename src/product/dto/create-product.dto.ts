import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number

    @IsOptional()
    description: string
    
}
