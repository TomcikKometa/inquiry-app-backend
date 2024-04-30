import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';

import { InquiryService } from '../services/inquiry/inquiry.service';
import { GetAllInquiryResponse } from './@models/responses/get-all-inqury-response';
import { CreateInquiryRequest } from './@models/requests/create-inquiry-requests';
import { Request } from 'express';
import { EditInquryRequest } from './@models/requests/edit-inquiry-request';
import { InquiryDto } from '../services/inquiry/model/inquiry-dto';
import { GetOneInquiryResponse } from './@models/responses/get-one-inqiry-response';

@Controller('/inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Get('/all')
  public async getAll(): Promise<GetAllInquiryResponse> {
    const inquiryList: InquiryDto[] = await this.inquiryService.getAll();
    return { inquiryList };
  }

  @Post('/save')
  public async saveInquiry(@Body() body: CreateInquiryRequest) {
    await this.inquiryService.saveInquiry(body);
  }

  @Get(':id')
  public async getById(@Param('id') id: number): Promise<GetOneInquiryResponse> {
    return {
      inquiry: await this.inquiryService.getById(id)
    }
  }

  @Patch('/edit/:id')
  public editInquiry(@Param('id')id:number,@Req() request: Request<EditInquryRequest>){
    this.inquiryService.editInquiry(id,request.body)
  }

  @Delete('/delete/:id')
   public async deleteInquiry(@Param('id')id: number): Promise<void>{
     await this.inquiryService.deleteInquiryRequest(id);
  }
}
