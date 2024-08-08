import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScaleQuestionDto } from '../inquiry/model/scale-question-dto';
import { ScaleQuestion } from '../../../../entities/scale-question';

@Injectable()
export class ScaleQuestionService {
  constructor(
    @InjectRepository(ScaleQuestion)
    private scaleQuestionRepository: Repository<ScaleQuestion>
  ) {}

  public save(dto: ScaleQuestionDto): Promise<ScaleQuestion> {
    const scaleQuestion: ScaleQuestion = new ScaleQuestion();
    scaleQuestion.max = dto.max;
    scaleQuestion.min = dto.min;
    scaleQuestion.stepSize = dto.stepSize;

    return this.scaleQuestionRepository.save(scaleQuestion);
  }
}
