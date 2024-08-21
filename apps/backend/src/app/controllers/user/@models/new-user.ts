import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NewUserRequest {
  @ApiProperty()
  @IsNotEmpty()
  public userName: string;
  
  @ApiProperty()
  @IsNotEmpty()
  public password: string;

  @ApiProperty()
  @IsNotEmpty()
  public email: string;

  @ApiPropertyOptional()
  public firstName?: string;

  @ApiPropertyOptional()
  public lastName?: string;
}
