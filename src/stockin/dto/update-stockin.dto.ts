import { PartialType } from '@nestjs/mapped-types';
import { CreateStockinDto } from './create-stockin.dto';

export class UpdateStockinDto extends PartialType(CreateStockinDto) {}
