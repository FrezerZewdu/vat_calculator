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
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiPaginatedResponse } from 'src/prisma/decorator';
import { FetchAccountsDto, updateAccountDto } from './dto';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { HasRoles } from 'src/auth/decorator/has-roles.decorator';
import { roles } from 'src/auth/dto/enums';

@UseGuards(JwtGuard, RolesGuard)
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  @HasRoles(roles.norAdmin)
  @ApiPaginatedResponse(FetchAccountsDto)
  fetchAccounts(
    @Query('search') search: string = '',
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    return this.accountService.getAllAccounts({ page, perPage }, search);
  }

  @Put()
  @HasRoles(roles.norAdmin)
  @HttpCode(HttpStatus.ACCEPTED)
  updateAccountInfo(@Body() userInfo: updateAccountDto) {
    return this.accountService.editAccount(userInfo);
  }

  @Delete(':accountId')
  @HasRoles(roles.norAdmin)
  @HttpCode(HttpStatus.ACCEPTED)
  deleteAccount(@Param('accountId') accountId: string) {
    const accountIdNumber = parseInt(accountId);
    if (Number.isNaN(accountIdNumber)) {
      throw new UnprocessableEntityException('The account ID is not a number');
    }
    return this.accountService.deleteAccount(parseInt(accountId));
  }
}
