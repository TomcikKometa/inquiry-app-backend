import { Logger } from '@nestjs/common';
import { QuestionType } from '../../../entities/enums/question-type';
import { Inquiry } from '../../../entities/inquiry';
import { Question } from '../../../entities/question';
import { InquiryDto } from '../model/inquiry-dto';
import { ShortTextQuestionDto } from '../model/shortTextQuestionDto';

export class InquiryDtoMapper {
  public static map(inquiry: Inquiry): InquiryDto {
    Logger.log(inquiry.questions);
    return {
      id: inquiry.ID,
      name: inquiry.Name,
      questions: inquiry.questions?.map((question: Question) => {
        switch (question.questionType) {
          case QuestionType.SHORT_TEXT:
            return this.mapToShortTextQuestionDto(question);
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
}
