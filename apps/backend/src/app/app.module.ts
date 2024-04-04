import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inquiry } from './entities/inquiry';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    entities: [Inquiry],
    synchronize: true,
    database:'db_inquiry'
  }),],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule {}
