import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from '../../entities/inquiry';
import { SaveInquiryRequest } from '../../controllers/@models/requests/save-inquiry-requests';
import { log } from 'console';
import { EditInquryRequest } from '../../controllers/@models/requests/edit-inquiry-request';

@Injectable()
export class InquiryService {
  constructor(
    @InjectRepository(Inquiry)
    private inquiryRepository: Repository<Inquiry>
  ) {}

  public getAll(): Promise<Inquiry[]> {
    return this.inquiryRepository.find();
  }

  public getById(id: number): Promise<Inquiry | null> {
    return this.inquiryRepository.findOneBy({ ID: id });
  }

  public saveInquiry(request: SaveInquiryRequest): void {
    const inquiry = new Inquiry();
    inquiry.Name = request.name;
    this.inquiryRepository.save(inquiry);
  }

  public async editInquiry(id: number, request: EditInquryRequest) {
    const inquiryToEdit: Inquiry | null = await this.getById(id);
    if (inquiryToEdit) {
      inquiryToEdit.Name = request.name;
      this.inquiryRepository.save(inquiryToEdit);
    }
  }
}
