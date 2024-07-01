import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectBodyDto, CreateProjectParamDto, DeleteProjectParamDto, FindAllProjectParamDto, FindAllProjectQueryDto, FindOneProjectParamDto, UpdateProjectParamDto } from './project.dto';
import { UserInstance } from 'src/main/auth';
import { User } from '@prisma/client';
import { Lang, LangEnum } from 'src/constants';

@Controller(':organizationId/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  create(@Body() body: CreateProjectBodyDto, @Param() param: CreateProjectParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.projectService.create({ body, lang, param, user });
  }

  @Get()
  findAll(@Query() query: FindAllProjectQueryDto, @Param() param: FindAllProjectParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.projectService.findAll({ lang, param, query, user });
  }

  @Get(':id')
  findOne(@Param() param: FindOneProjectParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.projectService.findOne({ lang, param, user });
  }

  @Patch(':id')
  update(@Body() body: CreateProjectBodyDto, @Param() param: UpdateProjectParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.projectService.update({ body, lang, param, user });
  }

  @Delete(':id')
  remove(@Param() param: DeleteProjectParamDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.projectService.remove({ lang, param, user });
  }
}
