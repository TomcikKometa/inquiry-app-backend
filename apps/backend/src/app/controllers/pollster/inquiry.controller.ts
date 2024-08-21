import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { InquiryService } from '../../modules/pollster/services/inquiry/inquiry.service';
import { InquiryDto } from '../../modules/pollster/services/inquiry/model/inquiry-dto';
import { CreateInquiryRequest } from './@models/requests/create-inquiry-requests';
import { EditInquryRequest } from './@models/requests/edit-inquiry-request';
import { GetAllInquiryResponse } from './@models/responses/get-all-inqury-response';
import { GetOneInquiryResponse } from './@models/responses/get-one-inqiry-response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('pollster-inquiry')
@Controller('/pollster/inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @ApiResponse({type:GetAllInquiryResponse})
  @Get('/all')
  public async getAll(): Promise<GetAllInquiryResponse> {
    const inquiryList: InquiryDto[] = await this.inquiryService.getAll();
    return { inquiryList };
  }

  @Post('/save')
  public async saveInquiry(@Body() body: CreateInquiryRequest) {
    return await this.inquiryService.saveInquiry(body);
  }

  @Get(':id')
  public async getById(@Param('id') id: number): Promise<GetOneInquiryResponse> {
    return {
      inquiry: await this.inquiryService.getById(id)
    }
  }

  @Patch('/edit/:id')
  public editInquiry(@Param('id')id:number,@Req() request: Request<EditInquryRequest>) {
    return this.inquiryService.editInquiry(id,request.body)
  }

  @Delete('/delete/:id')
   public async deleteInquiry(@Param('id')id: number): Promise<void>{
     await this.inquiryService.deleteInquiryRequest(id);
  }
}
