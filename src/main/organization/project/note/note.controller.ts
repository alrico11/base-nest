import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { User } from "@prisma/client";
import { Lang, LangEnum } from "src/constants";
import { UserInstance } from "src/main/auth";
import { CreateNoteBodyDto, CreateNoteParamDto, NoteService } from "src/main/note";

@Controller('organization/:organizationId/project/:projectId/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @Post('organization/:organizationId/project/:projectId/note')
  organizationProjectCreateNote(@Param() param: CreateNoteParamDto, @Body() body: CreateNoteBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.create({ body, lang, user, param });
  }

  @Get('organization/:organizationId/project/:projectId/note')
  organizationProjectFindAllNote(@Param() param: CreateNoteParamDto, @Body() body: CreateNoteBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.create({ body, lang, user, param });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.noteService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
  //   return this.noteService.update(+id, updateNoteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.noteService.remove(+id);
  // }
}
