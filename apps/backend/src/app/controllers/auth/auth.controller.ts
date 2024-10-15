import { Body, Controller, Get, Header, Headers, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequest } from './model/login-request';
import { AuthService } from '../../modules/auth/services/auth.service';
import { LoginResponse } from './model/login-response';
import { RefreshTokenResponse } from './model/refresh-token-response';
import { AuthGuard } from '../../guard/auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ type: LoginResponse })
  @HttpCode(HttpStatus.ACCEPTED)
  @Header('x-pagination','1')
  @Post('/login')
  public async loginUser(@Body() body: LoginRequest): Promise<LoginResponse> {
    return await this.authService.login(body.username, body.password);
  }

  @ApiResponse({ type: RefreshTokenResponse })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Get('/refresh')
  public async refreshToken(@Headers('Authorization') authHeader: string): Promise<string> {
    return this.authService.refreshToken(authHeader);
  }
}
