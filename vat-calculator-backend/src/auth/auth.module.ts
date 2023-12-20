import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthControllor } from './auth.controller';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthControllor],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
