import { Module } from '@nestjs/common';
import { HashingService } from './services/hashing.service';

@Module({
    exports: [HashingService],
    providers: [ HashingService]})
export class SharedModule {}
