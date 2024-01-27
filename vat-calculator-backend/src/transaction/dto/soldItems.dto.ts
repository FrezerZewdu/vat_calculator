import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class createSalesOrder {
  @IsNotEmpty()
  @IsNumber()
  itemId: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  unitPrice: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  quantity: number;

  @IsNotEmpty()
  @IsBoolean()
  isVat: boolean;
}

export class createCreditRecord {
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  amountPayed: number;
}
