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
import { ScaleQuestion } from '../entities/scale-question';
import { ScaleQuestionService } from '../services/scale-question/scale-question.service';
import { ShortTextQuestionService } from '../services/short-text-question/short-text-question.service';
import { SingleSelectAnswerService } from '../services/single-select-answer.service.ts/single-select-answer.service';
import { SingleSelectQuestionService } from '../services/single-select-question/single-select-question.service';
import { MultiSelectQuestionService } from '../services/multi-select-question/multi-select-question.service';
import { MultiSelectAnswerService } from '../services/multi-select-answer/multi-select-answer.service';
import { QuestionService } from '../services/question/question.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Inquiry,
      Question,
      ShortTextQuestion,
      MultiSelectQuestion,
      SingleSelectQuestion,
      MultiSelectAnswer,
      SingleSelectAnswer,
      ScaleQuestion,
    ]),
  ],
  providers: [
    InquiryService,
    ScaleQuestionService,
    ShortTextQuestionService,
    SingleSelectAnswerService,
    SingleSelectQuestionService,
    MultiSelectQuestionService,
    MultiSelectAnswerService,
    QuestionService
  ],
  controllers: [InquiryController],
})
export class InquiryModule {}
