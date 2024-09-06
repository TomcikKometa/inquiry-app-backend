import { Injectable } from '@nestjs/common';
import { NewUserRequest } from '../../../controllers/user/@models/new-user';
import { Repository } from 'typeorm';
import { User } from '../../../entities/user';
import { UserType } from '../../../entities/enums/user-type';
import { HashingService } from '../../shared/services/hashing.service';
import { UserDetailsDto } from './models/user-details-dto';
import { UserDetailsMapper } from './mapper/user-details-mapper';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor( @InjectRepository(User) private readonly userRepository: Repository<User>, private readonly hashingService: HashingService) {}

  public async createUser(user: NewUserRequest): Promise<void> {
    const newUser: User = new User();
    newUser.email = user.email;
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.password = await this.hashingService.hash(user.password);
    newUser.userName = user.userName;
    newUser.userType = UserType.POLLSTER;
    await this.userRepository.save(newUser);
  }

  public async getUserDetails(id: number): Promise<UserDetailsDto | null> {
    const userInfo: User = await this.userRepository.findOneBy({ id });
    return UserDetailsMapper.mapToUserDetails(userInfo);
  }

  public async editUserEmial(id:number,userEmail:string):Promise<void>{
    const userInfo: User = await this.userRepository.findOneBy({ id });
    userInfo.email = userEmail;
    this.userRepository.save(userInfo);
  }

  public async editUserPassword(id:number,userPassword:string):Promise<void>{
    const userInfo: User = await this.userRepository.findOneBy({ id });
    userInfo.password = await this.hashingService.hash(userPassword);
    this.userRepository.save(userInfo);
  }
}
