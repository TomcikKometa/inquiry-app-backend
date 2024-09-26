import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user';
import { HashingService } from '../../shared/services/hashing.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../../shared/models/token-payload';
import { JWTdecoded } from '../models/jwt-decoded';
import { LoginResponse } from '../../../controllers/auth/model/login-response';
import { MapUserDtoResponse } from '../mapper/user-dto-mapper';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly hashingService: HashingService,private readonly jwtService:JwtService) {}


  public async login(userName: string, requestPassword: string): Promise<LoginResponse> {
    if (userName === '' && requestPassword === '') {
      throw new UnauthorizedException();
    }
    const user: User = await this.userRepository.findOneBy({ userName });

    if (!user) {
      throw new UnauthorizedException();
    }

    if (await this.hashingService.verifyUserPassord(user.password, requestPassword)) {
      return { access_token: await this.generateJWToken(user),userId:MapUserDtoResponse.mapUserDtoResponse(user)}
    } else throw new UnauthorizedException();
  }

  private generateJWToken(user: User | JWTdecoded): Promise<string> {
    return this.jwtService.signAsync({id:user.id,email:user.email} as (TokenPayload | JWTdecoded))
  }


  public refreshToken(header:string){
    const [type, token] = header?.split(' ') ?? [];
    type === 'Bearer' ? token : undefined;
    const jwtDecoded: JWTdecoded = this.jwtService.decode(token);
    return this.generateJWToken(jwtDecoded);
  }
}
