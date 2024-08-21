import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { QuestionType } from "../../../../../entities/enums/question-type";

export class QuestionDto {
    @ApiProperty()
    label: string;

    @ApiProperty({enum:QuestionType})
    type: QuestionType;

    @ApiPropertyOptional()
    id?:number;
}