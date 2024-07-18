import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { UserInstance, UserJwtGuard } from 'src/main/auth';
import { UserDeviceGuard } from 'src/main/device';
import { CreateTaskBodyDto, CreateTaskParamDto, DeleteTaskParamDto, FindAllTaskParamDto, FindAllTaskQueryDto, FindOneTaskParamDto, TaskService, UpdateTaskBodyDto, UpdateTaskParamDto } from 'src/main/task';

@ApiTags('Main Organization Project Task')
@ApiHeaders(DeviceHeaders)
// @UseGuards(UserJwtGuard, UserDeviceGuard)
@UseGuards(UserJwtGuard)
@Controller('organization/:organizationId/project/:projectId/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: 'CreateMainOrganizationProjectTask' })
  @Post()
  create(@Param() param: CreateTaskParamDto, @Body() body: CreateTaskBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.create({ body, lang, user, param });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'FindAllMainOrganizationProjectTask' })
  @Get()
  findAll(@Param() param: FindAllTaskParamDto, @Query() query: FindAllTaskQueryDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.findAll({ lang, query, user, param });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'FindOneMainOrganizationProjectTask' })
  @Get(':id')
  findOne(@Param() param: FindOneTaskParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.findOne({ lang, param, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'UpdateMainOrganizationProjectTask' })
  @Patch(':id')
  update(@Param() param: UpdateTaskParamDto, @Body() body: UpdateTaskBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.update({ body, lang, param, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'DeleteMainOrganizationProjectTask' })
  @Delete(':id')
  remove(@Param() param: DeleteTaskParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.taskService.remove({ lang, param, user });
  }
}
