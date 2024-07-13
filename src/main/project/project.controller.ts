import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectBodyDto, DeleteProjectParamDto, FindAllProjectQueryDto, FindOneProjectParamDto, UpdateProjectParamDto, UpdateProjectBodyDto, CreateProjectParamDto, FindAllProjectParamDto } from './project.dto';
import { UserInstance, UserJwtGuard } from 'src/main/auth';
import { User } from '@prisma/client';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDeviceGuard } from 'src/main/device';

@Controller('project')
@ApiTags('User Project')
@ApiHeaders(DeviceHeaders)
@UseGuards(UserJwtGuard, UserDeviceGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: "CreateProject" })
  create(@Param() param: CreateProjectParamDto, @Body() body: CreateProjectBodyDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.projectService.create({ body, lang, user, param });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: "FindAllProject" })
  findAll(@Param() param: FindAllProjectParamDto, @Query() query: FindAllProjectQueryDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.projectService.findAll({ lang, query, user, param });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: "FindOneProject" })
  findOne(@Param() param: FindOneProjectParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.projectService.findOne({ lang, param, user });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: "UpdateProject" })
  update(@Body() body: UpdateProjectBodyDto, @Param() param: UpdateProjectParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.projectService.update({ body, lang, param, user });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: "DeleteProject" })
  remove(@Param() param: DeleteProjectParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.projectService.remove({ lang, param, user });
  }
}
