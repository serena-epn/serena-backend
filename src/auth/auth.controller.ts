import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard, Public } from './auth.guard';
import { AuthService } from './auth.service';
import { AdminAuthDTO, AuthDTO, AuthJWTDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: AuthDTO) {
    return this.authService.signIn(signInDto.username, signInDto.password,signInDto.applicationToken);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('admin-login')
  adminLogin(@Body() adminAuthDto: AdminAuthDTO) {
    return this.authService.adminLogin(adminAuthDto.userEmail, adminAuthDto.inputPassword);
  }
  
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/getfromjwt')
  getFromJWT(@Body() authJWT: AuthJWTDTO) {
    return this.authService.getUserFromToken(authJWT.jwt);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  
  @Post('validate-session')
  @HttpCode(200)
  validateToken() {
    return { result: true };
  }
}