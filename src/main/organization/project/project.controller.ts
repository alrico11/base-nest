import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { UserInstance, UserJwtGuard } from 'src/main/auth';
import { UserDeviceGuard } from 'src/main/device';
import { CreateProjectBodyDto, CreateProjectParamDto, DeleteProjectParamDto, FindAllProjectCollaboratorParamDto, FindAllProjectCollaboratorQueryDto, FindAllProjectParamDto, FindAllProjectQueryDto, FindOneProjectParamDto, UpdateProjectParamDto } from './project.dto';
import { ProjectService } from './project.service';

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

  @Get(':id/collaborator')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'FindAllCollaboratorFromProject' })
  findAllCollaborator(@Query() query: FindAllProjectCollaboratorQueryDto, @Lang() lang: LangEnum, @Param() param: FindAllProjectCollaboratorParamDto) {
    return this.projectService.findAllCollaborator({ lang, param, query })
  }
}
