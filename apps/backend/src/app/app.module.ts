import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Inquiry } from './entities/inquiry';
import { InquiryModule } from './inquiry-module/inquiry.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      entities: [Inquiry],
      synchronize: true,
      database: 'db_inquiry',
    }),
    InquiryModule,
  ],
})
export class AppModule {}
