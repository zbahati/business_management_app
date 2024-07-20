import { PartialType } from '@nestjs/mapped-types';
import { CreateStockoutDto } from './create-stockout.dto';

export class UpdateStockoutDto extends PartialType(CreateStockoutDto) {}
