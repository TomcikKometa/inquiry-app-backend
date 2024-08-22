import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user';
import { HashingService } from '../../shared/services/hashing.service';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly hashingService: HashingService) {}

  public async login(userName: string, requestPassword: string): Promise<string> {
    if (userName === '' && requestPassword === '') {
      throw new UnauthorizedException();
    }
    const user: User = await this.userRepository.findOneBy({ userName });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (await this.hashingService.verifyUserPassord(user.password, requestPassword)) {
      return 'token';
    } else throw new UnauthorizedException();
  }
}
