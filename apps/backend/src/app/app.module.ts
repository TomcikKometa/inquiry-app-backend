import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PollsterInquiryModule } from './modules/pollster/pollster-inquiry.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './guard/jwt-constant';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      autoLoadEntities:true,
      synchronize: true,
      database: 'db_inquiry',
    }),
    PollsterInquiryModule,
    UserModule,
    AuthModule,
    JwtModule.register({
      global:true,
      secret:jwtConstant.secret,
      signOptions:{expiresIn:'240s'},
    })
  ]
})
export class AppModule {}
