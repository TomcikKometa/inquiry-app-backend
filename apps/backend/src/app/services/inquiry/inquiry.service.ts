import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from '../../entities/inquiry';
import { CreateInquiryRequest } from '../../controllers/@models/requests/create-inquiry-requests';
import { EditInquryRequest } from '../../controllers/@models/requests/edit-inquiry-request';
import { InquiryDto } from './model/inquiry-dto';

@Injectable()
export class InquiryService {
  constructor(
    @InjectRepository(Inquiry)
    private inquiryRepository: Repository<Inquiry>
  ) {}

  public async getAll(): Promise<InquiryDto[]> {
    return (await this.inquiryRepository.find()).map((entity:Inquiry) => (this.entityToDto(entity)));
  }

  public async getById(id: number): Promise<InquiryDto | null> {
    const entityInquiry:Inquiry = await this.inquiryRepository.findOneBy({ ID: id });
    return this.entityToDto(entityInquiry);
  }

  public saveInquiry(request: CreateInquiryRequest): void {
    const inquiry = new Inquiry();
    inquiry.Name = request.name;
    this.inquiryRepository.save(inquiry);
  }

  public async editInquiry(id: number, request: EditInquryRequest) {
    const inquiryToEdit: Inquiry | null = await this.inquiryRepository.findOneBy({ID:id})
    if (inquiryToEdit) {
      inquiryToEdit.Name = request.name;
      this.inquiryRepository.save(inquiryToEdit);
    }
  }

  public async deleteInquiryRequest(id:number): Promise<void>{
    await this.inquiryRepository.findOneBy({ID:id}).then(async (value:Inquiry) => { await this.inquiryRepository.delete(value)})
  }

  private entityToDto(entity:Inquiry): InquiryDto {
    return {
      id : entity.ID,
      name : entity.Name
    };
  }
}
