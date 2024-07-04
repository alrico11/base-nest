import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Lang, LangEnum } from 'src/constants';
import { CreateTaskBodyDto, CreateTaskParamDto, DeleteTaskParamDto, FindAllTaskParamDto, FindAllTaskQueryDto, FindOneTaskParamDto, UpdateTaskBodyDto, UpdateTaskParamDto } from './task.dto';
import { TaskService } from './task.service';
import { UserInstance, UserJwtGuard } from 'src/main/auth';

@Controller('organization/:organizationId/task')
// @UseGuards(UserJwtGuard, UserDeviceGuard)
@UseGuards(UserJwtGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  create(@Param() param: CreateTaskParamDto, @Body() body: CreateTaskBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.create({ body, lang, user, param });
  }

  @Get()
  findAll(@Param() param: FindAllTaskParamDto, @Query() query: FindAllTaskQueryDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.findAll({ lang, query, user, param });
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
