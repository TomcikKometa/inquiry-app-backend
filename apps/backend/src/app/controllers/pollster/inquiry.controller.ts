import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { InquiryService } from '../../modules/pollster/services/inquiry/inquiry.service';
import { InquiryDto } from '../../modules/pollster/services/inquiry/model/inquiry-dto';
import { CreateInquiryRequest } from './@models/requests/create-inquiry-requests';
import { EditInquryRequest } from './@models/requests/edit-inquiry-request';
import { GetAllInquiryResponse } from './@models/responses/get-all-inqury-response';
import { GetOneInquiryResponse } from './@models/responses/get-one-inqiry-response';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guard/auth.guard';

@ApiTags('pollster-inquiry')
@Controller('/pollster/inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiResponse({type:GetAllInquiryResponse})
  @UseGuards(AuthGuard)
  @Get('/all')
  public async getAll(): Promise<GetAllInquiryResponse> {
    const inquiryList: InquiryDto[] = await this.inquiryService.getAll();
    return { inquiryList };
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Post('/save')
  public async saveInquiry(@Body() body: CreateInquiryRequest) {
    return await this.inquiryService.saveInquiry(body);
  }
  
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Get(':id')
  public async getById(@Param('id') id: number): Promise<GetOneInquiryResponse> {
    return {
      inquiry: await this.inquiryService.getById(id)
    }
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Patch('/edit/:id')
  public editInquiry(@Param('id')id:number,@Req() request: Request<EditInquryRequest>) {
    return this.inquiryService.editInquiry(id,request.body)
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
   public async deleteInquiry(@Param('id')id: number): Promise<void>{
     await this.inquiryService.deleteInquiryRequest(id);
  }
}
