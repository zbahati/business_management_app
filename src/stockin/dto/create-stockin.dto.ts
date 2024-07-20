import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator";

export class CreateStockinDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    quantity: number

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number

    @IsNotEmpty()
    @IsNumber()
    product: number

    @IsOptional()
    @IsNumber()
    total_price: number

}
