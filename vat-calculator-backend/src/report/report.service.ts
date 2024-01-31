/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) {}

  async fetchDailyReport() {
    try {
      const startDate = new Date();
      startDate.setHours(0);
      startDate.setMinutes(0);
      const prisma = new PrismaClient();
      const dailyReport = await prisma.$transaction(async (tx) => {
        // get todays transactions
        const dailySales = await tx.transaction.findMany({
          select: {
            totalAmount: true,
            remainingAmount: true,
            isVat: true,
          },
          where: {
            createdAt: {
              gte: startDate.toISOString(),
            },
          },
        });

        // get todays purchases
        const dailyPurchase = await tx.inventory.findMany({
          where: {
            startDate: {
              gte: startDate,
            },
          },
          select: {
            isVat: true,
            quantity: true,
            unitPrice: true,
          },
        });

        // outstanding credits return 6
        const outstandingCredits = await tx.transaction.findMany({
          where: {
            remainingAmount: {
              gte: 0,
            },
            void: false,
          },
          orderBy: {
            remainingAmount: 'desc',
          },
          take: 6,
          select: {
            createdAt: true,
            totalAmount: true,
            remainingAmount: true,
          },
        });

        // use group by(itemId) to fetch sale orders and sum and order by that sum
        const popularItems =
          await tx.$queryRaw`SELECT itemId, SUM(unitPrice * quantity) AS total FROM saleOrder GROUP BY itemId ORDER BY total DESC LIMIT 6 `;

        const totalSales = dailySales.reduce((sum, transaction) => {
          return sum + transaction.totalAmount;
        }, 0.0);

        const totalPurchase = dailyPurchase.reduce((sum, purchase) => {
          return sum + purchase.quantity * purchase.unitPrice;
        }, 0.0);
        return {
          totalSales: totalSales,
          totalCollected:
            totalSales -
            dailySales.reduce((sum, transaction) => {
              return sum + transaction.remainingAmount;
            }, 0.0),
          totalPurchase: totalPurchase,
          totalPurchaseCount: dailyPurchase.reduce((sum, purchase) => {
            return sum + purchase.quantity;
          }, 0.0),
          profit: totalSales - totalPurchase,
          outstandingCreditLIst: outstandingCredits,
          popularItems: popularItems,
        };
      });
      return dailyReport;
    } catch (error) {
      console.log(error);
    }
  }

  async fetchFilterByDateRange(startDate: string, endDate: string) {
    try {
      let beginDate = new Date(startDate);
      let lastDate = new Date(endDate);
      beginDate.setHours(0);
      lastDate.setHours(23);
      const prisma = new PrismaClient();
      const filteredReport = await prisma.$transaction(async (tx) => {
        const transaction =
          await tx.$queryRaw`select Date(createdAt) as day, sum(totalAmount) as total from transaction where createdAt between ${beginDate.toISOString()} and ${lastDate.toISOString()} group by DATE(createdAt)`;
        const purchase =
          await tx.$queryRaw`select Date(startDate) as day, sum(quantity * unitPrice) as total from inventory where startDate between ${beginDate.toISOString()} and ${lastDate.toISOString()} group by DATE(startDate)`;

        return {
          transactions: transaction,
          purchases: purchase,
        };
      });
      return filteredReport;
    } catch (error) {
      console.log(error);
    }
  }
}
