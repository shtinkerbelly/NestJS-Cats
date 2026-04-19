import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class SearchCatDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  age?: number;

  @IsString()
  @IsOptional()
  breed?: string;
}
