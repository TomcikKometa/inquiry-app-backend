import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from '../../entities/inquiry';
import { CreateInquiryRequest } from '../../controllers/@models/requests/create-inquiry-requests';
import { EditInquryRequest } from '../../controllers/@models/requests/edit-inquiry-request';
import { InquiryDto } from './model/inquiry-dto';
import { QuestionDto } from './model/question-dto';
import { QuestionType } from '../../entities/enums/question-type';
import { ShortTextQuestion } from '../../entities/short-text-question';
import { ShortTextQuestionDto } from './model/shortTextQuestionDto';
import { Question } from '../../entities/question';
import { MultiSelectQuestion } from '../../entities/multi-select-question';
import { MultiSelectQuestionDto } from './model/multi-select-question-dto';
import { MultiSelectAnswer } from '../../entities/multi-select-answer';
import { MultiSelectAnswerDto } from './model/mulsti-select-answer-dto';
import { SingleSelectAnswer } from '../../entities/single-select-answer';
import { SingleSelectQuestion } from '../../entities/single-select-question';
import { SingleSelectQuestionDto } from './model/single-select-question-dto';
import { ScaleQuestionDto } from './model/scale-question-dto';
import { ScaleQuestionService } from '../scale-question/scale-question.service';
import { ShortTextQuestionService } from '../short-text-question/short-text-question.service';
import { SingleSelectAnswerService } from '../single-select-answer.service.ts/single-select-answer.service';
import { SingleSelectQuestionService } from '../single-select-question/single-select-question.service';
import { MultiSelectQuestionService } from '../multi-select-question/multi-select-question.service';
import { MultiSelectAnswerService } from '../multi-select-answer/multi-select-answer.service';

@Injectable()
export class InquiryService {
  constructor(
    @InjectRepository(Inquiry)
    private inquiryRepository: Repository<Inquiry>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(ShortTextQuestion)
    private shortTextQuestionRepository: Repository<ShortTextQuestion>,
    @InjectRepository(MultiSelectQuestion)
    private multiSelectQuestionRepository: Repository<MultiSelectQuestion>,
    @InjectRepository(MultiSelectAnswer)
    private mulsiSelectAnswerRepository: Repository<MultiSelectAnswer>,
    @InjectRepository(SingleSelectQuestion)
    private singleSelectQuestionRepository: Repository<SingleSelectQuestion>,
    @InjectRepository(SingleSelectAnswer)
    private singleSelectAnswerRepository: Repository<SingleSelectAnswer>,
    private readonly scaleQuestionService: ScaleQuestionService,
    private readonly shortTextQuestionService: ShortTextQuestionService,
    private readonly singleSelectAnswerService: SingleSelectAnswerService,
    private readonly singleSelectQuestionService: SingleSelectQuestionService,
    private readonly multiSelectQuestionService: MultiSelectQuestionService,
    private readonly multiSelectAnswerService: MultiSelectAnswerService
  ) {}

  public async getAll(): Promise<InquiryDto[]> {
    return (await this.inquiryRepository.find()).map((entity: Inquiry) =>
      this.entityToDto(entity)
    );
  }

  public async getById(id: number): Promise<InquiryDto | null> {
    const entityInquiry: Inquiry = await this.inquiryRepository.findOneBy({
      ID: id,
    });
    return this.entityToDto(entityInquiry);
  }

  public async saveInquiry(request: CreateInquiryRequest): Promise<void> {
    const inquiry = new Inquiry();
    inquiry.Name = request.name;
    await this.inquiryRepository.save(inquiry);
    const questions = request.questions.map(
      async (questionDto: QuestionDto) => {
        const question: Question = new Question(
          questionDto.type,
          questionDto.label,
          inquiry
        );
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
    await this.questionRepository.save(await Promise.all(questions));
  }

  public async editInquiry(id: number, request: EditInquryRequest) {
    const inquiryToEdit: Inquiry | null =
      await this.inquiryRepository.findOneBy({ ID: id });
    if (inquiryToEdit) {
      inquiryToEdit.Name = request.name;
      this.inquiryRepository.save(inquiryToEdit);
    }
  }

  public async deleteInquiryRequest(id: number): Promise<void> {
    await this.inquiryRepository
      .findOneBy({ ID: id })
      .then(async (value: Inquiry) => {
        await this.inquiryRepository.delete(value);
      });
  }

  private entityToDto(entity: Inquiry): InquiryDto {
    return {
      id: entity.ID,
      name: entity.Name,
      questions: entity.questions?.map((question: Question) => {
        return {
          label: question.label,
          type: question.questionType as QuestionType,
        };
      }),
    };
  }
}
