import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  status?: string
}
