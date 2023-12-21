import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Units } from './enum';

export class fetchItemsDto {
  id: number;
  name: string;
  unit: Units;
  isActive: boolean;
}

export class createItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(Units)
  @IsNotEmpty()
  unit: Units;

  @IsNumber()
  @IsNumber()
  createdBy: number;
}

export class updateItemDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsEnum(Units)
  @IsOptional()
  unit?: Units;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsNotEmpty()
  createdBy: string;
}
