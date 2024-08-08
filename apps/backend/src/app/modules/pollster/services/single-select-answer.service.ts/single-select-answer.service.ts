import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SingleSelectQuestionDto } from '../inquiry/model/single-select-question-dto';
import { SingleSelectAnswerDto } from '../inquiry/model/single-select-answer-dto';
import { SingleSelectAnswer } from '../../../../entities/single-select-answer';

@Injectable()
export class SingleSelectAnswerService {
  constructor(
    @InjectRepository(SingleSelectAnswer)
    private readonly singleSelectAnswerRepository: Repository<SingleSelectAnswer>
  ) {}

  public save(questionDto: SingleSelectQuestionDto): Promise<SingleSelectAnswer[]> {
    return this.singleSelectAnswerRepository.save(
      (questionDto as SingleSelectQuestionDto).answers.map((answerDto: SingleSelectAnswerDto) => new SingleSelectAnswer(answerDto.answer))
    );
  }
}
