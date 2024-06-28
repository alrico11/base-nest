import { Injectable } from '@nestjs/common';
import { CreateSopDto } from './dto/create-sop.dto';
import { UpdateSopDto } from './dto/update-sop.dto';

@Injectable()
export class SopService {
  create(createSopDto: CreateSopDto) {
    return 'This action adds a new sop';
  }

  findAll() {
    return `This action returns all sop`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sop`;
  }

  update(id: number, updateSopDto: UpdateSopDto) {
    return `This action updates a #${id} sop`;
  }

  remove(id: number) {
    return `This action removes a #${id} sop`;
  }
}
