import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiPaginatedResponse } from 'src/prisma/decorator';
import { FetchAccountsDto, updateAccountDto } from './dto';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  @ApiPaginatedResponse(FetchAccountsDto)
  fetchAccounts(
    @Query('search') search: string = '',
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    return this.accountService.getAllAccounts({ page, perPage }, search);
  }

  @Put()
  @HttpCode(HttpStatus.ACCEPTED)
  updateAccountInfo(@Body() userInfo: updateAccountDto) {
    return this.accountService.editAccount(userInfo);
  }

  @Delete(':accountId')
  @HttpCode(HttpStatus.ACCEPTED)
  deleteAccount(@Param('accountId') accountId: string) {
    return this.accountService.deleteAccount(parseInt(accountId));
  }
}
