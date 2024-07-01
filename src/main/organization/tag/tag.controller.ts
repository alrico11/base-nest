import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { UserInstance, UserJwtGuard } from 'src/main/auth';
import { UserDeviceGuard } from 'src/main/device';
import { CreateTagBodyDto, CreateTagParamDto, DeleteTagParamDto, FindAllTagParamDto, FindAllTagQueryDto, UpdateTagBodyDto, UpdateTagParamDto } from './tag.dto';
import { TagService } from './tag.service';

@Controller('organization/:organizationId/tag')
@ApiHeaders(DeviceHeaders)
@ApiTags("User Tag Organization")
@UseGuards(UserJwtGuard, UserDeviceGuard)
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
