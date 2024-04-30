import { QuestionType } from "../../../entities/enums/question-type";

export interface QuestionDto {
    label: string;
    type: QuestionType;
}