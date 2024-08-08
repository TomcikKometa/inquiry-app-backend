import { MultiSelectAnswerDto } from './mulsti-select-answer-dto';
import { QuestionDto } from "./question-dto";

export class MultiSelectQuestionDto extends QuestionDto {
  answers: MultiSelectAnswerDto[];
}
