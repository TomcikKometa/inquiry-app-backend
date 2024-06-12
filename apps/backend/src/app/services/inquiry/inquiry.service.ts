import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from '../../entities/inquiry';
import { CreateInquiryRequest } from '../../controllers/@models/requests/create-inquiry-requests';
import { EditInquryRequest } from '../../controllers/@models/requests/edit-inquiry-request';
import { InquiryDto } from './model/inquiry-dto';
import { QuestionType } from '../../entities/enums/question-type';
import { Question } from '../../entities/question';
import { QuestionService } from '../question/question.service';
import { InquiryDtoMapper } from './mapper/inquiry-dto-mapper';

@Injectable()
export class InquiryService {
  constructor(
    @InjectRepository(Inquiry)
    private inquiryRepository: Repository<Inquiry>,
    private readonly questionService: QuestionService
  ) {}

  public async getAll(): Promise<InquiryDto[]> {
    return (await this.inquiryRepository.find()).map((entity: Inquiry) => this.entityToDto(entity));
  }

  public async getById(id: number): Promise<InquiryDto | null> {
    const inquiry: Inquiry = await this.inquiryRepository.findOneBy({
      ID: id
    });
    return InquiryDtoMapper.map(inquiry);
  }

  public async saveInquiry(request: CreateInquiryRequest): Promise<void> {
    const inquiry = new Inquiry();
    inquiry.Name = request.name;
    await this.questionService.saveQuestionList(await this.inquiryRepository.save(inquiry), request.questions);
  }

  public async editInquiry(id: number, request: EditInquryRequest) {
    const inquiryToEdit: Inquiry | null = await this.inquiryRepository.findOneBy({ ID: id });
    if (inquiryToEdit) {
      inquiryToEdit.Name = request.name;
      this.inquiryRepository.save(inquiryToEdit);
    }
  }

  public async deleteInquiryRequest(id: number): Promise<void> {
    await this.inquiryRepository.findOneBy({ ID: id }).then(async (value: Inquiry) => {
      await this.inquiryRepository.remove(value);
    });
  }

  private entityToDto(entity: Inquiry): InquiryDto {
    return {
      id: entity.ID,
      name: entity.Name,
      questions: entity.questions?.map((question: Question) => {
        return {
          label: question.label,
          type: question.questionType as QuestionType
        };
      })
    };
  }
}
