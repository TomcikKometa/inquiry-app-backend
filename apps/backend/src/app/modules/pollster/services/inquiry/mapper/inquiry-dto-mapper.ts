import { QuestionType } from '../../../../../entities/enums/question-type';
import { Inquiry } from '../../../../../entities/inquiry';
import { Question } from '../../../../../entities/question';
import { InquiryDto } from '../model/inquiry-dto';
import { MultiSelectQuestionDto } from '../model/multi-select-question-dto';
import { ScaleQuestionDto } from '../model/scale-question-dto';
import { ShortTextQuestionDto } from '../model/shortTextQuestionDto';
import { SingleSelectQuestionDto } from '../model/single-select-question-dto';

export class InquiryDtoMapper {
  public static map(inquiry: Inquiry): InquiryDto {
    return {
      id: inquiry.ID,
      name: inquiry.Name,
      questions: inquiry.questions.map((question: Question) => {
        switch (question.questionType) {
          case QuestionType.SHORT_TEXT:
            return this.mapToShortTextQuestionDto(question);
          case QuestionType.MULTISELECT:
            return this.mapToMultiSelectQuestion(question);
          case QuestionType.SINGLE_SELECT:
            return this.mapToSingleSelectQuestion(question);
          case QuestionType.SCALE:
            return this.mapToScaleQuestion(question);
        }
        return {
          label: question.label,
          type: question.questionType as QuestionType
        };
      })
    };
  }

  private static mapToShortTextQuestionDto(question: Question): ShortTextQuestionDto {
    return {
      id: question.id,
      label: question.label,
      type: question.questionType as QuestionType,
      answer: question.shortTextQuestion.answer
    };
  }

  private static mapToMultiSelectQuestion(question: Question): MultiSelectQuestionDto {
    return {
      id: question.id,
      label: question.label,
      type: question.questionType as QuestionType,
      answers: question.multiSelectQuestion.answers
    };
  }

  private static mapToSingleSelectQuestion(question: Question): SingleSelectQuestionDto {
    return {
      id: question.id,
      answers: question.singleSelectQuestion.answers,
      label: question.label,
      type: question.questionType as QuestionType
    };
  }

  private static mapToScaleQuestion(question: Question): ScaleQuestionDto {
    return {
      id: question.id,
      label: question.label,
      type: question.questionType as QuestionType,
      max: question.scaleQuestion.max,
      min: question.scaleQuestion.min,
      stepSize: question.scaleQuestion.stepSize
    };
  }
}
