import { IsNotEmpty } from "class-validator";
import { QuestionDto } from "../../../../modules/pollster/services/inquiry/model/question-dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateInquiryRequest {
  @IsNotEmpty({message:'Name is required'})
  @ApiProperty()
  name: string;

  @ApiProperty({type:[QuestionDto]})
  @IsNotEmpty({message:'Questions are required'})
  questions:QuestionDto[];
}
