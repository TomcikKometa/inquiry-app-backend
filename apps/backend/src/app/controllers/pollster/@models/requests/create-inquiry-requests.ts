import { IsNotEmpty } from "class-validator";
import { QuestionDto } from "../../../../modules/pollster/services/inquiry/model/question-dto";

export class CreateInquiryRequest {
  @IsNotEmpty({message:'Name is required'})
  name: string;
  @IsNotEmpty({message:'Questions are required'})
  questions:QuestionDto[];
}
