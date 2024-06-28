import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';
import { UserInstance, UserJwtGuard } from '../auth';
import { UserDeviceGuard } from '../device';
import { CreateTagBodyDto, DeleteTagParamDto, FindAllTagQueryDto, UpdateTagBodyDto, UpdateTagParamDto } from './tag.dto';
import { User } from '@prisma/client';

@Controller('tag')
@ApiHeaders(DeviceHeaders)
@UseGuards(UserJwtGuard, UserDeviceGuard)
@ApiTags("User Tag")
export class TagController {
  constructor(private readonly tagService: TagService) { }

  @Post()
  create(@Body() body: CreateTagBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.tagService.create({ body, lang, user });
  }

  @Get()
  findAll(@Query() query: FindAllTagQueryDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.tagService.findAll({ lang, query, user });
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
