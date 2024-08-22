import { Module } from '@nestjs/common';
import { UserController } from '../../controllers/user/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user';
import { HashingService } from '../shared/services/hashing.service';

@Module({
  controllers: [UserController],
  providers: [UserService, HashingService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService]
})
export class UserModule {}
