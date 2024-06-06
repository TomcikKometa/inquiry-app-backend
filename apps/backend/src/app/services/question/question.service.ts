import { Injectable, Logger } from '@nestjs/common';
import { QuestionType } from '../../entities/enums/question-type';
import { Question } from '../../entities/question';
import { MultiSelectQuestionDto } from '../inquiry/model/multi-select-question-dto';
import { QuestionDto } from '../inquiry/model/question-dto';
import { ScaleQuestionDto } from '../inquiry/model/scale-question-dto';
import { ShortTextQuestionDto } from '../inquiry/model/shortTextQuestionDto';
import { SingleSelectQuestionDto } from '../inquiry/model/single-select-question-dto';
import { ScaleQuestionService } from '../scale-question/scale-question.service';
import { MultiSelectAnswerService } from '../multi-select-answer/multi-select-answer.service';
import { MultiSelectQuestionService } from '../multi-select-question/multi-select-question.service';
import { ShortTextQuestionService } from '../short-text-question/short-text-question.service';
import { SingleSelectAnswerService } from '../single-select-answer.service.ts/single-select-answer.service';
import { SingleSelectQuestionService } from '../single-select-question/single-select-question.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from '../../entities/inquiry';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private readonly scaleQuestionService: ScaleQuestionService,
    private readonly shortTextQuestionService: ShortTextQuestionService,
    private readonly singleSelectAnswerService: SingleSelectAnswerService,
    private readonly singleSelectQuestionService: SingleSelectQuestionService,
    private readonly multiSelectQuestionService: MultiSelectQuestionService,
    private readonly multiSelectAnswerService: MultiSelectAnswerService
  ) {}

  public async saveQuestionList(inquiry:Inquiry, questionsDto:QuestionDto[]): Promise<Question[]> {
    const questions: Promise<Question>[] = questionsDto.map(
      async (questionDto: QuestionDto) => {
        const question: Question = new Question();
        question.questionType = questionDto.type;
        Logger.log(questionDto.type);
        question.label = questionDto.label;
        question.inquiry = inquiry;

        switch (questionDto.type) {
          case QuestionType.SHORT_TEXT:
            question.shortTextQuestion =
              await this.shortTextQuestionService.save(
                questionDto as ShortTextQuestionDto
              );
            break;
          case QuestionType.MULTISELECT:
            question.multiSelectQuestion =
              await this.multiSelectQuestionService.saveWithAnswers(
                await this.multiSelectAnswerService.saveList(
                  (questionDto as MultiSelectQuestionDto).answers
                )
              );
            break;
          case QuestionType.SINGLE_SELECT:
            question.singleSelectQuestion =
              await this.singleSelectQuestionService.saveWithAnswers(
                await this.singleSelectAnswerService.save(
                  questionDto as SingleSelectQuestionDto
                )
              );
            break;
          case QuestionType.SCALE:
            question.scaleQuestion = await this.scaleQuestionService.save(
              questionDto as ScaleQuestionDto
            );
            break;
        }
        return question;
      }
    );
    return await this.questionRepository.save(await Promise.all(questions));
  }
}
