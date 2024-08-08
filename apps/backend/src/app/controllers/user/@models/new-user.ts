import { IsNotEmpty } from "class-validator";


export class NewUserRequest {

 @IsNotEmpty()
  public userName: string;

  @IsNotEmpty()
  public password: string;

  @IsNotEmpty()
  public email: string;

  public firstName?:string;
  public lastName?:string;
}
