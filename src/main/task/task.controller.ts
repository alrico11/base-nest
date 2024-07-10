import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { UserInstance, UserJwtGuard } from '../auth';
import { CreateTaskBodyDto, DeleteTaskParamDto, FindAllTaskQueryDto, FindOneTaskParamDto, UpdateTaskBodyDto, UpdateTaskParamDto } from './task.dto';
import { TaskService } from './task.service';
import { UserDeviceGuard } from '../device';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Main Task')
@ApiHeaders(DeviceHeaders)
@Controller('task')
@UseGuards(UserJwtGuard)
// @UseGuards(UserJwtGuard, UserDeviceGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: 'CreateMainTask' })
  @Post()
  create(@Body() body: CreateTaskBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.create({ body, lang, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'FindAllMainTask' })
  @Get()
  findAll(@Query() query: FindAllTaskQueryDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.findAll({ lang, query, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'FindOneMainTask' })
  @Get(':id')
  findOne(@Param() param: FindOneTaskParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.findOne({ lang, param, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'UpdateMainTask' })
  @Patch(':id')
  update(@Param() param: UpdateTaskParamDto, @Body() body: UpdateTaskBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.update({ body, lang, param, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'DeleteMainTask' })
  @Delete(':id')
  remove(@Param() param: DeleteTaskParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.remove({ lang, param, user });
  }
}
