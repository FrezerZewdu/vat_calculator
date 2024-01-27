import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { roles } from 'src/auth/dto/enums';

export class FetchAccountsDto {
  id: number;
  name: string;
  email: string;
  role: roles;
  createdBy: number;
}

export class updateAccountDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsEnum(roles)
  role?: roles;
}
