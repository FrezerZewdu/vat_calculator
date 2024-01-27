import { Injectable } from '@nestjs/common';
import { createPaginator } from 'prisma-pagination';
import { PaginationInfoDto } from 'src/prisma/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FetchAccountsDto, updateAccountDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async getAllAccounts(paginationInfo: PaginationInfoDto, search: string) {
    try {
      const perPage = paginationInfo.perPage;
      const paginate = createPaginator({ perPage });
      const accounts = paginate<FetchAccountsDto, Prisma.UserFindManyArgs>(
        this.prisma.user,
        {
          where: {
            name: {
              contains: search.length > 0 ? search : undefined,
            },
          },
        },
        {
          page: paginationInfo.page,
        },
      );
      return accounts;
    } catch (error) {
      console.log(error);
    }
  }

  async editAccount(userInfo: updateAccountDto) {
    try {
      const account = await this.prisma.user.update({
        where: {
          id: userInfo.id,
        },
        data: { ...userInfo },
      });
      return account;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAccount(accountId: number) {
    try {
      const account = await this.prisma.user.delete({
        where: {
          id: accountId,
        },
      });
      return account;
    } catch (error) {
      console.log(error);
    }
  }
}
