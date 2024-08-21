import { IsNotEmpty } from 'class-validator';
import { QuestionDto } from '../../../../modules/pollster/services/inquiry/model/question-dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EditInquryRequest {
  @IsNotEmpty({ message: 'Id is required' })
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  questions?: QuestionDto[];
}
