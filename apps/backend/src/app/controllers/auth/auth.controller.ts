import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequest } from './model/login-request';
import { AuthService } from '../../modules/auth/services/auth.service';
import { LoginResponse } from './model/login-response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({type:LoginResponse})
  @Post('/login')
  public async loginUser(@Body() body: LoginRequest): Promise<LoginResponse> {
    return { token: await this.authService.login(body.username, body.password) };
  }
}
