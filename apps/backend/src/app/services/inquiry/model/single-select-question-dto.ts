import { QuestionDto } from "./question-dto";
import { SingleSelectAnswerDto } from "./single-select-answer-dto";

export class SingleSelectQuestionDto extends QuestionDto{
    answers:SingleSelectAnswerDto[]
}