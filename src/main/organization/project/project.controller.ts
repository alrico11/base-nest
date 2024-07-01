import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectBodyDto, CreateProjectParamDto, DeleteProjectParamDto, FindAllProjectParamDto, FindAllProjectQueryDto, FindOneProjectParamDto, UpdateProjectParamDto } from './project.dto';
import { UserInstance, UserJwtGuard } from 'src/main/auth';
import { User } from '@prisma/client';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDeviceGuard } from 'src/main/device';

@Controller('organization/:organizationId/project')
@ApiHeaders(DeviceHeaders)
@ApiTags('User Organization Project')
@UseGuards(UserJwtGuard, UserDeviceGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: "CreateProjectOrganization" })
  create(@Body() body: CreateProjectBodyDto, @Param() param: CreateProjectParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.projectService.create({ body, lang, param, user });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: "FindAllProjectOrganization" })
  findAll(@Query() query: FindAllProjectQueryDto, @Param() param: FindAllProjectParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.projectService.findAll({ lang, param, query, user });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: "FindOneProjectOrganization" })
  findOne(@Param() param: FindOneProjectParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.projectService.findOne({ lang, param, user });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: "UpdateProjectOrganization" })
  update(@Body() body: CreateProjectBodyDto, @Param() param: UpdateProjectParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.projectService.update({ body, lang, param, user });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: "DeleteProjectOrganization" })
  remove(@Param() param: DeleteProjectParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.projectService.remove({ lang, param, user });
  }
}
