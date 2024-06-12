import { IsNotEmpty } from "class-validator";
import { QuestionDto } from "../../../services/inquiry/model/question-dto";

export class EditInquryRequest{
    @IsNotEmpty({message:'Id is required'})
    id:number;

    name?:string;
    questions?:QuestionDto[]
}