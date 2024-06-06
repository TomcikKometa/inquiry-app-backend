import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MultiSelectAnswer } from '../../entities/multi-select-answer';
import { Repository } from 'typeorm';
import { MultiSelectAnswerDto } from '../inquiry/model/mulsti-select-answer-dto';

@Injectable()
export class MultiSelectAnswerService {
  constructor(
    @InjectRepository(MultiSelectAnswer)
    private readonly multiSelectAnswerRepository: Repository<MultiSelectAnswer>
  ) {}

  public saveList(dto: MultiSelectAnswerDto[]): Promise<MultiSelectAnswer[]> {
    return this.multiSelectAnswerRepository.save(
      dto.map((value: MultiSelectAnswerDto) => {
        const multiSelectAnswer: MultiSelectAnswer = new MultiSelectAnswer();
        multiSelectAnswer.answer = value.answer;
        return multiSelectAnswer;
      })
    );
  }
}
