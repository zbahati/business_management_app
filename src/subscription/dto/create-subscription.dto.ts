import { IsNotEmpty, IsNumber, IsPositive, Min, min } from "class-validator";


export class CreateSubscriptionDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    amount: number
}
