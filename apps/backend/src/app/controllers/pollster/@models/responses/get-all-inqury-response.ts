import { ApiProperty } from '@nestjs/swagger';
import { InquiryDto } from '../../../../modules/pollster/services/inquiry/model/inquiry-dto';

export class GetAllInquiryResponse {
  @ApiProperty({type:[InquiryDto]})
  inquiryList: InquiryDto[];
}
