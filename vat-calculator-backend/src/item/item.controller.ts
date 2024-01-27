import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { HasRoles } from 'src/auth/decorator/has-roles.decorator';
import { roles } from 'src/auth/dto/enums';
import { ApiPaginatedResponse } from 'src/prisma/decorator';
import { createItemDto, fetchItemsDto, updateItemDto } from './dto/item.dto';

@UseGuards(JwtGuard)
@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get('getAll')
  @UseGuards(RolesGuard)
  @HasRoles(roles.norAdmin)
  fetchItemsInfo(@Query('page') page: number = 1) {
    return this.itemService.fetchAllItemInfo(page);
  }

  @Get()
  @UseGuards(RolesGuard)
  @HasRoles(roles.norAdmin)
  @ApiPaginatedResponse(fetchItemsDto)
  fetchItems(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    return this.itemService.fetchAllItems({ page, perPage });
  }

  @Get('active')
  @UseGuards(RolesGuard)
  @HasRoles(roles.norAdmin, roles.sales)
  fetchAvailableItems(@Query('search') search: string = '') {
    return this.itemService.fetchActiveItems(search);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @HasRoles(roles.norAdmin)
  createItem(@Body() itemInfo: createItemDto) {
    return this.itemService.createItem(itemInfo);
  }

  @Put()
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(RolesGuard)
  @HasRoles(roles.norAdmin)
  editItem(@Body() itemInfo: updateItemDto) {
    return this.itemService.editItem(itemInfo);
  }

  @Delete(':itemId')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(RolesGuard)
  @HasRoles(roles.norAdmin)
  deleteItem(@Param('itemId') itemId: string) {
    return this.itemService.deleteItem(parseInt(itemId));
  }
}
