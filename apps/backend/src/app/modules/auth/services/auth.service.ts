import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user';
import { HashingService } from '../../shared/services/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../../shared/models/token-payload';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly hashingService: HashingService,private readonly jwtService:JwtService) {}

  public async login(userName: string, requestPassword: string): Promise<string> {
    if (userName === '' && requestPassword === '') {
      throw new UnauthorizedException();
    }
    const user: User = await this.userRepository.findOneBy({ userName });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (await this.hashingService.verifyUserPassord(user.password, requestPassword)) {
      return this.generateJWToken(user)
    } else throw new UnauthorizedException();
  }

  private generateJWToken(user: User): Promise<string> {
    return this.jwtService.signAsync({id:user.id,email:user.emial} as TokenPayload)
  }


  public refreshToken(header:string){
    Logger.log('header',header)
    return 'token'
  }
}
