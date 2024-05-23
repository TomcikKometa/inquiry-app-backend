import { QuestionDto } from "./question-dto";

export class ScaleQuestionDto  extends QuestionDto {
  stepSize: number;
  max: number;
  min: number;
}
