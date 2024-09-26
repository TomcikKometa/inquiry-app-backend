import { Body, Controller, Get, Headers, Post, UseGuards } from '@nestjs/common';
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
  @Post('/login')
  public async loginUser(@Body() body: LoginRequest): Promise<LoginResponse> {
    return {
      access_token: (await this.authService.login(body.username, body.password)).access_token,
      userId: (await this.authService.login(body.username, body.password)).userId
    };
    return { access_token: (await this.authService.login(body.username, body.password)).access_token,id: (await this.authService.login(body.username, body.password)).id};

  }

  @ApiResponse({ type: RefreshTokenResponse })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Get('/refresh')
  public async refreshToken(@Headers('Authorization') authHeader: string): Promise<string> {
    return this.authService.refreshToken(authHeader);
  }
}
