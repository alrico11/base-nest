import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { UserInstance, UserJwtGuard } from 'src/main/auth';
import { UserDeviceGuard } from 'src/main/device';
import { CreateNoteBodyDto, CreateNoteParamDto, DeleteNoteParamDto, FindAllNoteParamDto, FindAllNoteQueryDto, NoteService, UpdateNoteBodyDto, UpdateNoteParamDto } from 'src/main/note';
import { MemberCollaboratorGuard } from '../member-collaborator.guard';

@ApiTags('Main Project Note')
@ApiHeaders(DeviceHeaders)
// @UseGuards(UserJwtGuard, UserDeviceGuard)
@UseGuards(UserJwtGuard)
@Controller('project/:projectId/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: 'CreateMainNote' })
  @Post()
  create(@Param() param: CreateNoteParamDto, @Body() body: CreateNoteBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.create({ body, lang, user, param });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'FindAllMainNote' })
  @Get()
  findAll(@Param() param: FindAllNoteParamDto, @Query() query: FindAllNoteQueryDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.findAll({ lang, query, user, param });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'UpdateMainNote' })
  @Patch(':id')
  update(@Param() param: UpdateNoteParamDto, @Body() body: UpdateNoteBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.update({ body, lang, param, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'DeleteMainNote' })
  @Delete(':id')
  remove(@Param() param: DeleteNoteParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.remove({ lang, param, user });
  }
}
