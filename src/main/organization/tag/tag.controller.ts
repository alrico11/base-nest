import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { CreateTagBodyDto, CreateTagParamDto, DeleteTagParamDto, FindAllTagParamDto, FindAllTagQueryDto, UpdateTagBodyDto, UpdateTagParamDto } from './tag.dto';
import { User } from '@prisma/client';
import { UserInstance, UserJwtGuard } from 'src/main/auth';
import { UserDeviceGuard } from 'src/main/device';

@Controller('organization/:organizationId/tag')
@ApiHeaders(DeviceHeaders)
@UseGuards(UserJwtGuard, UserDeviceGuard)
@ApiTags("User Tag Organization")
export class TagController {
  constructor(private readonly tagService: TagService) { }

  @Post()
  create(@Param() param: CreateTagParamDto, @Body() body: CreateTagBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.tagService.create({ body, lang, user, param });
  }

  @Get()
  findAll(@Param() param: FindAllTagParamDto, @Query() query: FindAllTagQueryDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.tagService.findAll({ lang, query, user, param });
  }

  @Patch(':id')
  update(@Param() param: UpdateTagParamDto, @Body() body: UpdateTagBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.tagService.update({ body, lang, param, user });
  }

  @Delete(':id')
  remove(@Param() param: DeleteTagParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.tagService.remove({ lang, param, user });
  }
}
