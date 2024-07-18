import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HistoryService } from './history.service';
import { FindAllHistoryParamDto, FindAllHistoryQueryDto } from './histoy.dto';
import { UserInstance } from '../auth';
import { User } from '@prisma/client';
import { Lang, LangEnum } from 'src/constants';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) { }

  @Get(':taskId')
  findAll(@Query() query: FindAllHistoryQueryDto, @Param() param: FindAllHistoryParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.historyService.findAll({ lang, query, user, param });
  }
}
