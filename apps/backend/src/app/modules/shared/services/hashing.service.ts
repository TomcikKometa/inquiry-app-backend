import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  public salt = '$HvK6pePhGn';

  public hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt);
  }
}
