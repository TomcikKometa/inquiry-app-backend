import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortTextQuestion } from '../../entities/short-text-question';
import { Repository } from 'typeorm';
import { ShortTextQuestionDto } from '../inquiry/model/shortTextQuestionDto';

@Injectable()
export class ShortTextQuestionService {
  constructor(
    @InjectRepository(ShortTextQuestion)
    private readonly shortTextQuestionRepository: Repository<ShortTextQuestion>
  ) {}

  public save(dto: ShortTextQuestionDto): Promise<ShortTextQuestion> {
    const shortTextQuestion: ShortTextQuestion = new ShortTextQuestion();
    shortTextQuestion.answer = dto.answer;
    return this.shortTextQuestionRepository.save(shortTextQuestion);
  }
}
