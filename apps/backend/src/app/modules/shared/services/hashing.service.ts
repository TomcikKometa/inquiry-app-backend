import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {

  public hash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  public verifyUserPassord(encryptedPassword: string, userRequestPssword: string): Promise<boolean> {
    return bcrypt.compare(userRequestPssword, encryptedPassword);
  }
}
