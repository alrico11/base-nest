import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { User } from '@prisma/client';
import { Lang, LangEnum } from 'src/constants';
import { UserInstance } from '../auth';
import { CreateProjectBodyDto, DeleteProjectParamDto, FindAllProjectQueryDto, FindOneProjectParamDto, UpdateProjectBodyDto, UpdateProjectParamDto } from './project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  create(@Body() body: CreateProjectBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.projectService.create({ body, lang, user });
  }

  @Get()
  findAll(@Query() query: FindAllProjectQueryDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.projectService.findAll({ lang, query, user });
  }

  @Get(':id')
  findOne(@Param() param: FindOneProjectParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.projectService.findOne({ lang, param, user });
  }

  @Patch(':id')
  update(@Param() param: UpdateProjectParamDto, @Body() body: UpdateProjectBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.projectService.update({ body, lang, param, user });
  }

  @Delete(':id')
  remove(@Param() param: DeleteProjectParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.projectService.remove({ lang, param, user });
  }
}
