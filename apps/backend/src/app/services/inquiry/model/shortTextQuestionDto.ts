import { QuestionDto } from "./question-dto";

export interface ShortTextQuestionDto extends QuestionDto {
    answer:string;
}