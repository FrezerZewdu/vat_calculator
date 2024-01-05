import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import { HasRoles } from './decorator/has-roles.decorator';
import { roles } from './dto/enums';
import { JwtGuard, RolesGuard } from './guard';

@Controller('auth')
export class AuthControllor {
  constructor(private authService: AuthService) {}

  @HasRoles(roles.supAdmin, roles.norAdmin)
  @UseGuards(JwtGuard, RolesGuard)
  @Post('signup')
  signup(@Body() request: SignupDto) {
    return this.authService.signup(request);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() request: LoginDto) {
    return this.authService.signin(request);
  }
}
