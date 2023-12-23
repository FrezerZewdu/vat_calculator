import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { TransactionService } from './transaction.service';
import { HasRoles } from 'src/auth/decorator/has-roles.decorator';
import { roles } from 'src/auth/dto/enums';
import { createCreditRecord, createTransacitonDto } from './dto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  @HasRoles(roles.norAdmin, roles.finance)
  fetchAllTransactions(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 15,
  ) {
    return this.transactionService.fetchAllTransaction({ page, perPage });
  }

  @Post()
  @HasRoles(roles.norAdmin, roles.sales)
  createSalesTransaction(
    @Body() transactionInfo: createTransacitonDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image' })],
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.transactionService.createSalesTransaction(transactionInfo);
  }

  @Post(':transactionId/credit')
  @HasRoles(roles.norAdmin, roles.finance)
  addCreditRecord(
    @Param('transactionId') transactionId: string,
    @Body() creditInfo: createCreditRecord,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image' })],
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.transactionService.addCreditRecord(
      parseInt(transactionId),
      creditInfo,
    );
  }

  @Put('void/:transactionId')
  @HasRoles(roles.norAdmin)
  voidTransaction(@Param('transactionId') transactionId: string) {
    return this.transactionService.voidTransaction(parseInt(transactionId));
  }
}
