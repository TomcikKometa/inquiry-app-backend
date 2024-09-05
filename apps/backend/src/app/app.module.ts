import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PollsterInquiryModule } from './modules/pollster/pollster-inquiry.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

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
      secret:'&&&&****9900',
      signOptions:{expiresIn:'120s'},
    })
  ]
})
export class AppModule {}
