import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { createPaginator } from 'prisma-pagination';
import { PaginationInfoDto } from 'src/prisma/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  TransactionFiltersDto,
  createCreditRecord,
  createTransacitonDto,
  fetchTransactionDto,
} from './dto';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async fetchAllTransaction(
    paginationInfo: PaginationInfoDto,
    transactionFilters: TransactionFiltersDto,
  ) {
    try {
      // set date to start from midnight of selected day
      const filterDate = new Date(transactionFilters.date);
      filterDate.setHours(0);
      filterDate.setMinutes(0);

      const perPage = paginationInfo.perPage;
      const paginate = createPaginator({ perPage });
      const transactions = await paginate<
        fetchTransactionDto,
        Prisma.TransactionFindManyArgs
      >(
        this.prisma.transaction,
        {
          where: {
            createdAt: {
              gte: filterDate,
            },
            remainingAmount: {
              gte: transactionFilters.type === 'creditOnly' ? 0 : undefined,
            },
            isVat:
              transactionFilters.type === 'vatOnly'
                ? true
                : transactionFilters.type === 'nonVatOnly'
                  ? false
                  : undefined,
          },
          include: {
            soldItems: {
              include: {
                item: {
                  select: {
                    name: true,
                    unit: true,
                  },
                },
              },
            },
            creditPayments: true,
          },
        },
        {
          page: paginationInfo.page,
        },
      );
      return transactions;
    } catch (error) {
      console.log(error);
    }
  }

  async createSalesTransaction(
    transactionInfo: createTransacitonDto,
    fileLocation?: string,
  ) {
    try {
      const prisma = new PrismaClient();
      const transaction = await prisma.$transaction(async (tx) => {
        // 1. check if all items in the sale order have required inventory levels
        transactionInfo.soldItems.forEach(async (item) => {
          const itemInventoryValue = await tx.inventory.aggregate({
            _sum: {
              quantity: true,
            },
            where: {
              itemId: item.itemId,
            },
          });
          const itemTransactionValue = await tx.saleOrder.aggregate({
            _sum: {
              quantity: true,
            },
            where: {
              itemId: item.itemId,
              transaction: {
                void: false,
              },
            },
          });

          const totalRemaining =
            itemInventoryValue._sum.quantity -
            itemTransactionValue._sum.quantity;

          if (totalRemaining < item.quantity) {
            throw new UnprocessableEntityException(
              `Item ${item.itemId} has ${totalRemaining} and you requested ${item.quantity}`,
              { cause: 'itemId', description: `${item.itemId}` },
            );
          }
        });

        // 2. Check if the payment is with credit or not depending on the remaining amount value
        let transaction = {};
        if (transactionInfo.remainingAmount) {
          transaction = await tx.transaction.create({
            data: {
              totalAmount: transactionInfo.totalAmount,
              remainingAmount: transactionInfo.remainingAmount,
              soldItems: {
                createMany: {
                  data: transactionInfo.soldItems,
                },
              },
              creditPayments: {
                create: {
                  amountPayed:
                    transactionInfo.totalAmount -
                    transactionInfo.remainingAmount,
                  fileLocation,
                },
              },
            },
            include: {
              soldItems: {
                include: {
                  item: {
                    select: {
                      name: true,
                      unit: true,
                    },
                  },
                },
              },
              creditPayments: true,
            },
          });
        } else {
          transaction = await tx.transaction.create({
            data: {
              totalAmount: transactionInfo.totalAmount,
              soldItems: {
                createMany: {
                  data: transactionInfo.soldItems,
                },
              },
            },
            include: {
              soldItems: {
                include: {
                  item: {
                    select: {
                      name: true,
                      unit: true,
                    },
                  },
                },
              },
            },
          });
        }
        return transaction;
      });

      return transaction;
    } catch (error) {
      console.log(error);
    }
  }

  // TODO: create trigger during credit finish to add date of credit finish
  async addCreditRecord(
    transactionId: number,
    amountPayed: number,
    fileLocation?: string,
  ) {
    try {
      const prisma = new PrismaClient();
      const record = await prisma.$transaction(async (tx) => {
        const creditSum = await tx.creditTracker.aggregate({
          _sum: {
            amountPayed: true,
          },
          where: {
            transactionId,
          },
        });

        const transactionTotalAmount = await tx.transaction.findUnique({
          where: {
            id: transactionId,
          },
        });

        // If credit is already payed of
        if (creditSum._sum.amountPayed == transactionTotalAmount.totalAmount) {
          throw new UnprocessableEntityException(`Credit already payed`);
        }

        // If incoming credit record is higher than that is left
        if (
          creditSum._sum.amountPayed + amountPayed >
          transactionTotalAmount.totalAmount
        ) {
          throw new UnprocessableEntityException(
            `Remaining credit is ${transactionTotalAmount.remainingAmount}`,
          );
        }

        const record = await tx.transaction.update({
          where: {
            id: transactionId,
          },
          data: {
            creditPayments: {
              create: {
                amountPayed: amountPayed,
                fileLocation,
              },
            },
            remainingAmount: {
              decrement: amountPayed,
            },
          },
        });

        return record;
      });

      return record;
    } catch (error) {
      console.log(error);
    }
  }

  async voidTransaction(transactionId: number) {
    try {
      const voidDate = new Date();
      const transaction = await this.prisma.transaction.update({
        where: {
          id: transactionId,
        },
        data: {
          void: true,
          voidDate: voidDate.toISOString(),
        },
      });

      return {
        message: 'Transaction has been voided',
        data: transaction,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
