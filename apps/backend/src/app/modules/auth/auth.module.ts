import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from '../../controllers/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user';
import { SharedModule } from '../shared/shared.module';

@Module({ 
    providers: [AuthService], 
    controllers: [AuthController], 
    imports: [TypeOrmModule.forFeature([User]),SharedModule]})
export class AuthModule {}
