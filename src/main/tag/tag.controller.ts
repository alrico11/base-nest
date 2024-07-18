import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { TagService } from './tag.service';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserInstance, UserJwtGuard } from '../auth';
import { UserDeviceGuard } from '../device';
import { CreateTagBodyDto, CreateTagParamDto, DeleteTagParamDto, FindAllTagParamDto, FindAllTagQueryDto, UpdateTagBodyDto, UpdateTagParamDto } from './tag.dto';
import { User } from '@prisma/client';

@Controller('tag')
@ApiHeaders(DeviceHeaders)
@ApiTags('User Tag')
// @UseGuards(UserJwtGuard, UserDeviceGuard)
@UseGuards(UserJwtGuard)
export class TagController {
  constructor(private readonly tagService: TagService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: 'CreateTag' })
  create(@Param() param: CreateTagParamDto, @Body() body: CreateTagBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.tagService.create({ body, lang, user, param });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'FindAllTags' })
  findAll(@Param() param: FindAllTagParamDto, @Query() query: FindAllTagQueryDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.tagService.findAll({ lang, query, user, param });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'UpdateTag' })
  update(@Param() param: UpdateTagParamDto, @Body() body: UpdateTagBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.tagService.update({ body, lang, param, user });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'DeleteTag' })
  remove(@Param() param: DeleteTagParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.tagService.remove({ lang, param, user });
  }
}
