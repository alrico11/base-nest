import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { Lang, LangEnum } from 'src/constants';
import { UserInstance, UserJwtGuard } from '../auth';
import { User } from '@prisma/client';
import { DeleteNoteParamDto, FindAllNoteQueryDto, UpdateNoteBodyDto, UpdateNoteParamDto } from './note.dto';
import { UserDeviceGuard } from '../device';

@Controller('note')
@UseGuards(UserJwtGuard)
// @UseGuards(UserJwtGuard,UserDeviceGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Post()
  create(@Body() body, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.create({ body, lang, user });
  }

  @Get()
  findAll(@Query() query: FindAllNoteQueryDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.findAll({ lang, query, user });
  }

  @Patch(':id')
  update(@Param() param: UpdateNoteParamDto, @Body() body: UpdateNoteBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.update({ body, lang, param, user });
  }

  @Delete(':id')
  remove(@Param() param: DeleteNoteParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.remove({ lang, param, user });
  }
}
