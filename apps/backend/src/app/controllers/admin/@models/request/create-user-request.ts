import { UserType } from '../../../../entities/enums/user-type';
import { IsNotEmpty } from 'class-validator';

export class CreateUserRequest {
  @IsNotEmpty() public userName: string;
  @IsNotEmpty() public password: string;
  @IsNotEmpty() public firstName: string;
  @IsNotEmpty() public userType: UserType;

  public lastname:string;
}
