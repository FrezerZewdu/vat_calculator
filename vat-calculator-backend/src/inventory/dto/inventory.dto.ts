import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class createInventoryDto {
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  unitPrice: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  quantity: number;

  @IsBoolean()
  isVat: boolean;

  @IsNotEmpty()
  @IsNumber()
  itemId: number;
}
