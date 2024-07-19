import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";
import { Product } from "src/product/entities/product.entity";

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
    product: Product

}
