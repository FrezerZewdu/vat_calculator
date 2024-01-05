import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { PaginationInfoDto } from 'src/prisma/dto';
import { Prisma } from '@prisma/client';
import { createItemDto, fetchItemsDto, updateItemDto } from './dto/item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async fetchAllItemInfo(page: number) {
    try {
      const cursor = page == 1 ? 1 : 10 * (page - 1);
      const items = await this.prisma.item.findMany({
        cursor: {
          id: cursor,
        },
        take: 9,
        include: {
          inventoryRecords: {
            select: {
              isVat: true,
              quantity: true,
              unitPrice: true,
            },
            orderBy: {
              startDate: 'desc',
            },
          },
          soldItems: {
            select: {
              isVat: true,
              quantity: true,
            },
          },
        },
      });
      items.forEach((item) => {
        let normalSum = 0;
        let vatSum = 0;
        let normalSold = 0;
        let vatSold = 0;
        if (item.inventoryRecords.length) {
          const latestPrice = item.inventoryRecords[0].unitPrice;
          item.inventoryRecords.forEach((record) => {
            if (record.isVat) {
              vatSum += record.quantity;
            } else {
              normalSum += record.quantity;
            }
          });
          item.soldItems.forEach((sale) => {
            if (sale.isVat) {
              vatSold += sale.quantity;
            } else {
              normalSold += sale.quantity;
            }
          });
          const normalStockRemaining = normalSum - normalSold;
          const vatStockRemaining = vatSum - vatSold;

          item['vatStock'] = vatStockRemaining;
          item['normalStock'] = normalStockRemaining;
          item['latestPrice'] = latestPrice;
        } else {
          item['vatStock'] = 0;
          item['normalStock'] = 0;
          item['latestPrice'] = 0;
        }
      });
      return {
        data: items,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async fetchAllItems(paginationInfo: PaginationInfoDto) {
    try {
      const perPage = paginationInfo.perPage;
      const paginate = createPaginator({ perPage });
      const items = await paginate<fetchItemsDto, Prisma.ItemFindManyArgs>(
        this.prisma.item,
        {},
        {
          page: paginationInfo.page,
        },
      );
      return {
        data: items,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async fetchActiveItems() {
    try {
      const activeItems = await this.prisma.item.findMany({
        where: {
          isActive: true,
        },
        include: {
          inventoryRecords: {
            select: {
              quantity: true,
            },
          },
          soldItems: {
            select: {
              quantity: true,
            },
          },
        },
      });
      const presentItems = [];
      activeItems.forEach((item) => {
        const inventorySum = item.inventoryRecords.reduce(
          (sum: number, inventoryRecord: { quantity: number }) =>
            sum + inventoryRecord.quantity,
          0,
        );
        const soldItemsSum = item.soldItems.reduce(
          (sum: number, soldItemRecord: { quantity: number }) =>
            sum + soldItemRecord.quantity,
          0,
        );
        if (inventorySum > soldItemsSum) {
          presentItems.push(item);
        }
      });
      return {
        data: presentItems,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async fetchItemDetail(itemId: number) {
    try {
      const item = await this.prisma.item.findUnique({
        where: {
          id: itemId,
        },
        include: {
          inventoryRecords: {
            orderBy: {
              startDate: 'desc',
            },
          },
          soldItems: true,
        },
      });
      return {
        data: item,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async createItem(itemInfo: createItemDto) {
    try {
      const item = await this.prisma.item.create({
        data: {
          ...itemInfo,
        },
      });
      return {
        data: item,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async editItem(itemInfo: updateItemDto) {
    try {
      const item = await this.prisma.item.update({
        where: {
          id: itemInfo.id,
        },
        data: {
          name: itemInfo?.name,
          unit: itemInfo?.unit,
          isActive: itemInfo?.isActive,
        },
      });
      return {
        message: 'Item Updated',
        data: item,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteItem(itemId: number) {
    try {
      const item = await this.prisma.item.delete({
        where: {
          id: itemId,
        },
      });
      return {
        message: 'Item deleted',
        data: item,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
