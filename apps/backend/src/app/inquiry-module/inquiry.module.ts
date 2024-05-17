import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inquiry } from '../entities/inquiry';
import { InquiryService } from '../services/inquiry/inquiry.service';
import { InquiryController } from '../controllers/inquiry.controller';
import { Question } from '../entities/question';
import { ShortTextQuestion } from '../entities/short-text-question';
import { MultiSelectQuestion } from '../entities/multi-select-question';
import { SingleSelectQuestion } from '../entities/single-select-question';
import { MultiSelectAnswer } from '../entities/multi-select-answer';
import { SingleSelectAnswer } from '../entities/single-select-answer';

@Module({
    imports: [TypeOrmModule.forFeature([Inquiry,Question,ShortTextQuestion,MultiSelectQuestion,SingleSelectQuestion,MultiSelectAnswer,SingleSelectAnswer])],
    providers: [InquiryService],
    controllers: [InquiryController],
  })
export class InquiryModule {}
