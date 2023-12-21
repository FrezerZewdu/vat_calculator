import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createInventoryDto } from './dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async createInventoryRecord(inventoryRecord: createInventoryDto) {
    try {
      const record = await this.prisma.item.update({
        where: {
          id: inventoryRecord.itemId,
        },
        data: {
          inventoryRecords: {
            create: {
              unitPrice: inventoryRecord.unitPrice,
              quantity: inventoryRecord.quantity,
              isVat: inventoryRecord.isVat,
            },
          },
        },
      });
      return {
        data: record,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
