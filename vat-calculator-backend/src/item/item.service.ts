import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { PaginationInfoDto } from 'src/prisma/dto';
import { Prisma } from '@prisma/client';
import { createItemDto, fetchItemsDto, updateItemDto } from './dto/item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

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
        data: item,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
