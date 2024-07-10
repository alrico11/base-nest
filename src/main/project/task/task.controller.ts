import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { UserInstance, UserJwtGuard } from 'src/main/auth';
import { UserDeviceGuard } from 'src/main/device';
import { CreateTaskBodyDto, CreateTaskParamDto, DeleteTaskParamDto, FindAllTaskParamDto, FindAllTaskQueryDto, FindOneTaskParamDto, UpdateTaskBodyDto, UpdateTaskParamDto } from './task.dto';
import { TaskService } from './task.service';

@ApiTags('Main Project Task')
@ApiHeaders(DeviceHeaders)
@UseGuards(UserJwtGuard, UserDeviceGuard)
@Controller('project/:projectId/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: 'CreateMainProjectTask' })
  @Post()
  create(@Param() param: CreateTaskParamDto, @Body() body: CreateTaskBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.create({ body, lang, user, param });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'FindAllMainProjectTask' })
  @Get()
  findAll(@Param() param: FindAllTaskParamDto, @Query() query: FindAllTaskQueryDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.findAll({ lang, query, user, param });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'FindOneMainProjectTask' })
  @Get(':id')
  findOne(@Param() param: FindOneTaskParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.findOne({ lang, param, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'UpdateMainProjectTask' })
  @Patch(':id')
  update(@Param() param: UpdateTaskParamDto, @Body() body: UpdateTaskBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.update({ body, lang, param, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'DeleteMainProjectTask' })
  @Delete(':id')
  remove(@Param() param: DeleteTaskParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.remove({ lang, param, user });
  }
}
