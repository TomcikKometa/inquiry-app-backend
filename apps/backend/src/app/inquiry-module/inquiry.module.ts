import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inquiry } from '../entities/inquiry';
import { InquiryService } from '../services/inquiry/inquiry.service';
import { InquiryController } from '../controllers/inquiry.controller';
import { Question } from '../entities/question';
import { ShortTextQuestion } from '../entities/short-text-question';

@Module({
    imports: [TypeOrmModule.forFeature([Inquiry,Question,ShortTextQuestion])],
    providers: [InquiryService],
    controllers: [InquiryController],
  })
export class InquiryModule {}
