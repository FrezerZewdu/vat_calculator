import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [PrismaModule, AuthModule, ItemModule, InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
