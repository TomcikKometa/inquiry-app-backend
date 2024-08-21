import { ApiProperty } from "@nestjs/swagger";
import { QuestionDto } from "./question-dto";

export class InquiryDto {
    @ApiProperty()
    id:number;

    @ApiProperty()
    name:string;

    @ApiProperty({type:[QuestionDto]})
    questions: QuestionDto[]
}