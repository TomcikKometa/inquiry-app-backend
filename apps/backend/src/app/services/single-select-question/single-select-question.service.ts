import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SingleSelectQuestion } from '../../entities/single-select-question';
import { Repository } from 'typeorm';
import { SingleSelectAnswer } from '../../entities/single-select-answer';

@Injectable()
export class SingleSelectQuestionService {

    constructor(@InjectRepository(()=>(SingleSelectQuestion))
    private readonly singleSelectQuestionRepository:Repository<SingleSelectQuestion>){}

    public saveWithAnswers(answers: SingleSelectAnswer[]):Promise<SingleSelectQuestion>{
       const singleSelectQuestion: SingleSelectQuestion = new SingleSelectQuestion();
       singleSelectQuestion.answers = answers;
       return this.singleSelectQuestionRepository.save(singleSelectQuestion)
    }
}
