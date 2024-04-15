import { Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';

import { InquiryService } from '../services/inquiry/inquiry.service';
import { GetAllInquiryResponse } from './@models/responses/get-all-inqury-response';
import { Inquiry } from '../entities/inquiry';
import { SaveInquiryRequest } from './@models/requests/save-inquiry-requests';
import { Request } from 'express';
import { EditInquryRequest } from './@models/requests/edit-inquiry-request';

@Controller('/inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @Get('/all')
  public async getAll(): Promise<GetAllInquiryResponse> {
    const inquiryList: Inquiry[] = await this.inquiryService.getAll();
    return { inquiryList };
  }

  @Post('/save')
  public saveInquiry(@Req() request: Request<SaveInquiryRequest>) {
    this.inquiryService.saveInquiry(request.body);
  }

  @Get(':id')
  public async getById(@Param('id') id: number): Promise<Inquiry> {
    return this.inquiryService.getById(id);
  }

  @Patch('/edit/:id')
  public editInquiry(@Param('id')id:number,@Req() request: Request<EditInquryRequest>){
    this.inquiryService.editInquiry(id,request.body)
  }
}
