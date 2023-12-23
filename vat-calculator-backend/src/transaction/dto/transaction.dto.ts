import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { createCreditRecord, createSalesOrder } from './soldItems.dto';

export class fetchTransactionDto {
  id: number;
  createdAt: Date;
  creditCloseDate?: Date;
  totalAmount: number;
  remainingAmount?: number;
  void: boolean;
  voidDate?: Date;
  soldItems: [];
  creditPayments: [];
}

export class createTransacitonDto {
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  totalAmount: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  remainingAmount?: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => createSalesOrder)
  soldItems: createSalesOrder[];

  @IsOptional()
  @IsObject()
  creditPayment?: createCreditRecord;
}
