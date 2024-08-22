import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  public salt = '$2b$10$PGCPBrbBYsOxi.Sc/vklHO';

  public hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt);
  }

  public verifyUserPassord(encryptedPassword: string, userRequestPssword: string): Promise<boolean> {
    return bcrypt.compare(userRequestPssword, encryptedPassword);
  }
}
