import { PartialType } from '@nestjs/mapped-types';
import { UpdateStockinDto } from 'src/stockin/dto/update-stockin.dto';

export class UpdateStockoutDto extends PartialType(UpdateStockinDto) {}
