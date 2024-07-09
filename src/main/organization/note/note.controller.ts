import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { Lang, LangEnum } from 'src/constants';
import { UserInstance } from 'src/main/auth';
import { CreateNoteBodyDto, CreateNoteParamDto, NoteService } from 'src/main/note';

@Controller()
export class NoteController {
  constructor(private readonly noteService: NoteService) { }
  // NOTE UNDER ORGANIZATION 
  @Post('organization/:organizationId/note')
  OrganizationCreateNote(@Param() param: CreateNoteParamDto, @Body() body: CreateNoteBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.create({ body, lang, user, param });
  }

  @Get("organization/:organizationId/note")
  organizationFindAllNote(@Param() param: CreateNoteParamDto, @Body() body: CreateNoteBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.create({ body, lang, user, param });
  }
}
