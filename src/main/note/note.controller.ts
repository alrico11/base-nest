import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { UserInstance, UserJwtGuard } from '../auth';
import { CreateNoteBodyDto, DeleteNoteParamDto, FindAllNoteQueryDto, UpdateNoteBodyDto, UpdateNoteParamDto } from './note.dto';
import { NoteService } from './note.service';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDeviceGuard } from '../device';

@ApiTags('Main Note')
@ApiHeaders(DeviceHeaders)
// @UseGuards(UserJwtGuard, UserDeviceGuard)
@Controller()
@UseGuards(UserJwtGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: 'CreateMainNote' })
  @Post('note')
  create(@Body() body: CreateNoteBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.create({ body, lang, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'FindAllMainNote' })
  @Get('note')
  findAll(@Query() query: FindAllNoteQueryDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.findAll({ lang, query, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'UpdateMainNote' })
  @Patch('note/:id')
  update(@Param() param: UpdateNoteParamDto, @Body() body: UpdateNoteBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.update({ body, lang, param, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'DeleteMainNote' })
  @Delete('note/:id')
  remove(@Param() param: DeleteNoteParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.remove({ lang, param, user });
  }
}
