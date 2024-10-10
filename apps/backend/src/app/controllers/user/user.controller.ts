import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NewUserRequest } from './@models/new-user';
import { UserService } from '../../modules/user/services/user.service';

@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')

  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() body: NewUserRequest) {
    return await this.userService.createUser(body);
  }
}
