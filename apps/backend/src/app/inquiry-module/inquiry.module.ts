import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inquiry } from '../entities/inquiry';
import { InquiryService } from '../services/inquiry/inquiry.service';
import { InquiryController } from '../controllers/inquiry.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Inquiry])],
    providers: [InquiryService],
    controllers: [InquiryController],
  })
export class InquiryModule {}
