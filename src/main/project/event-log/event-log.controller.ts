import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { User } from '@prisma/client';
import { Lang, LangEnum } from 'src/constants';
import { UserInstance } from '../../auth';
import { CreateEventLogBodyDto, CreateEventLogParamDto, FindAllEventLogQueryDto, RemoveEventLogParamDto, UpdateEventLogBodyDto, UpdateEventLogParamDto } from './event-log.dto';
import { EventLogService } from './event-log.service';

@Controller('project/:projectId/event-log')
export class EventLogController {
  constructor(private readonly eventLogService: EventLogService) { }

  @Post()
  create(@Body() body: CreateEventLogBodyDto, @Param() param: CreateEventLogParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.eventLogService.create({ body, lang, param, user });
  }

  @Get()
  findAll(@Query() query: FindAllEventLogQueryDto, @Param() param: UpdateEventLogParamDto, @Lang() lang: LangEnum) {
    return this.eventLogService.findAll({ lang, param, query });
  }

  @Patch(':id')
  update(@Param() param: UpdateEventLogParamDto, @Lang() lang: LangEnum, @Body() body: UpdateEventLogBodyDto, @UserInstance() user: User) {
    return this.eventLogService.update({ body, lang, param, user });
  }

  @Delete(':id')
  remove(@Param() param: RemoveEventLogParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.eventLogService.remove({ lang, param, user });
  }
}
