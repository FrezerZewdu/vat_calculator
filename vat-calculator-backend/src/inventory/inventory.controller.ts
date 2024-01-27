import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { HasRoles } from 'src/auth/decorator/has-roles.decorator';
import { roles } from 'src/auth/dto/enums';
import { createInventoryDto } from './dto';

@UseGuards(JwtGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @HasRoles(roles.norAdmin, roles.finance)
  createInventoryRecord(@Body() inventoryRecord: createInventoryDto) {
    return this.inventoryService.createInventoryRecord(inventoryRecord);
  }
}
