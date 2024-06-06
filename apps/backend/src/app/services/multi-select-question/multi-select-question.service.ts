import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MultiSelectQuestion } from '../../entities/multi-select-question';
import { Repository } from 'typeorm';
import { MultiSelectAnswer } from '../../entities/multi-select-answer';

@Injectable()
export class MultiSelectQuestionService {
  constructor(
    @InjectRepository(MultiSelectQuestion)
    private readonly multiSelectQuestionRepository: Repository<MultiSelectQuestion>
  ) {}

  public saveWithAnswers(
    answers: MultiSelectAnswer[]
  ): Promise<MultiSelectQuestion> {
    const multiSelectQuestion: MultiSelectQuestion = new MultiSelectQuestion();
    multiSelectQuestion.answers = answers;
    return this.multiSelectQuestionRepository.save(multiSelectQuestion);
  }
}
