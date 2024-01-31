import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { createPaginator } from 'prisma-pagination';
import { PaginationInfoDto } from 'src/prisma/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FetchAccountsDto, updateAccountDto } from './dto';
import { Prisma } from '@prisma/client';
import { roles } from 'src/auth/dto/enums';

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
            role: {
              not: roles.supAdmin,
            },
          },
          select: {
            name: true,
            email: true,
            createdBy: true,
            role: true,
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
      delete account.password;
      return account;
    } catch (error) {
      if (error.code == 'P2025') {
        throw new UnprocessableEntityException('Account Id does not exist');
      }
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
      if (error.code == 'P2025') {
        throw new UnprocessableEntityException('Account Id does not exist');
      }
    }
  }
}
