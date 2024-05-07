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

@Injectable()
export class InquiryService {
  constructor(
    @InjectRepository(Inquiry)
    private inquiryRepository: Repository<Inquiry>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(ShortTextQuestion)
    private shortTextQuestionRepository: Repository<ShortTextQuestion>
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
    const questions = request.questions.map(async (questionDto: QuestionDto) => {
        const question: Question = new Question(questionDto.type,questionDto.label,inquiry);
        if (questionDto.type === QuestionType.SHORT_TEXT) {
          const shortTextQuestion: ShortTextQuestion = await this.shortTextQuestionRepository.save(new ShortTextQuestion((questionDto as ShortTextQuestionDto).answer));
          question.shortTextQuestion = shortTextQuestion;
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
