import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Lang, LangEnum } from 'src/constants';
import { UserInstance, UserJwtGuard } from '../auth';
import { CreateTaskBodyDto, DeleteTaskParamDto, FindAllTaskQueryDto, FindOneTaskParamDto, UpdateTaskBodyDto, UpdateTaskParamDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
@UseGuards(UserJwtGuard)
// @UseGuards(UserJwtGuard, UserDeviceGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  create(@Body() body: CreateTaskBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.create({ body, lang, user });
  }

  @Get()
  findAll(@Query() query: FindAllTaskQueryDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.findAll({ lang, query, user });
  }

  @Get(':id')
  findOne(@Param() param: FindOneTaskParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.findOne({ lang, param, user });
  }

  @Patch(':id')
  update(@Param() param: UpdateTaskParamDto, @Body() body: UpdateTaskBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.update({ body, lang, param, user });
  }

  @Delete(':id')
  remove(@Param() param: DeleteTaskParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.remove({ lang, param, user });
  }
}
