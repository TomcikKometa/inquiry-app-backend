import { QuestionDto } from "./question-dto";

export interface InquiryDto {
    id:number;
    name:string;
    questions: QuestionDto[]
}