import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { TransactionService } from './transaction.service';
import { HasRoles } from 'src/auth/decorator/has-roles.decorator';
import { roles } from 'src/auth/dto/enums';
import {
  TransactionType,
  createTransacitonDto,
  fetchTransactionDto,
} from './dto';
import { ApiPaginatedResponse } from 'src/prisma/decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@UseGuards(JwtGuard, RolesGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  @HasRoles(roles.norAdmin, roles.finance)
  @ApiPaginatedResponse(fetchTransactionDto)
  fetchAllTransactions(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 15,
    @Query('date') date: string = new Date().toISOString(),
    @Query('type') type: TransactionType = TransactionType.all,
  ) {
    return this.transactionService.fetchAllTransaction(
      { page, perPage },
      { date, type },
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @HasRoles(roles.norAdmin, roles.sales)
  createSalesTransaction(@Body() transactionInfo: createTransacitonDto) {
    // console.log(file);
    return this.transactionService.createSalesTransaction(
      transactionInfo,
      'TestFile.jpg',
    );
  }

  @Post(':transactionId/credit')
  @HttpCode(HttpStatus.CREATED)
  @HasRoles(roles.norAdmin, roles.finance)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './credit_files',
      }),
    }),
  )
  addCreditRecord(
    @Param('transactionId') transactionId: string,
    @Body() amountPayed: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image' })],
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.transactionService.addCreditRecord(
      parseInt(transactionId),
      amountPayed,
      file.filename,
    );
  }

  @Put('void/:transactionId')
  @HttpCode(HttpStatus.CREATED)
  @HasRoles(roles.norAdmin)
  voidTransaction(@Param('transactionId') transactionId: string) {
    return this.transactionService.voidTransaction(parseInt(transactionId));
  }
}
