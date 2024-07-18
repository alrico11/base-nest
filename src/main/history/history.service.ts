import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { IFindAllHistory } from './history.@types';

@Injectable()
export class HistoryService {
  constructor(
    private readonly prisma: PrismaService
  ) { }
  async findAll({ lang, param, query, user }: IFindAllHistory) {
    return `This action returns all history`;
  }

}
