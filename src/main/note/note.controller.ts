import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Lang, LangEnum } from 'src/constants';
import { UserInstance, UserJwtGuard } from '../auth';
import { CreateNoteBodyDto, DeleteNoteParamDto, FindAllNoteQueryDto, UpdateNoteBodyDto, UpdateNoteParamDto } from './note.dto';
import { NoteService } from './note.service';

@Controller()
@UseGuards(UserJwtGuard)
export class NoteController {
  constructor(private readonly noteService: NoteService) { }
  // NOTE MAIN
  @Post('note')
  create(@Body() body: CreateNoteBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.create({ body, lang, user });
  }

  @Get('note')
  findAll(@Query() query: FindAllNoteQueryDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.findAll({ lang, query, user });
  }

  @Patch('note/:id')
  update(@Param() param: UpdateNoteParamDto, @Body() body: UpdateNoteBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.update({ body, lang, param, user });
  }

  @Delete('note/:id')
  remove(@Param() param: DeleteNoteParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.remove({ lang, param, user });
  }
}
