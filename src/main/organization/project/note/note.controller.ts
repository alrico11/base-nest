import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiHeaders, ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { DeviceHeaders, Lang, LangEnum } from "src/constants";
import { UserInstance, UserJwtGuard } from "src/main/auth";
import { UserDeviceGuard } from "src/main/device";
import { CreateNoteBodyDto, CreateNoteParamDto, FindAllNoteQueryDto, NoteService } from "src/main/note";


@ApiTags('Main Organization Project Note')
@ApiHeaders(DeviceHeaders)
@UseGuards(UserJwtGuard, UserDeviceGuard)
@Controller('organization/:organizationId/project/:projectId/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) { }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: 'CreateMainOrganizationProjectNote' })
  @Post('organization/:organizationId/project/:projectId/note')
  organizationProjectCreateNote(@Param() param: CreateNoteParamDto, @Body() body: CreateNoteBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.noteService.create({ body, lang, user, param });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'FindAllMainOrganizationNote' })
  @Get("organization/:organizationId/project/:projectId/note")
  organizationProjectFindAllNote(@Param() param: CreateNoteParamDto, @Lang() lang: LangEnum, @UserInstance() user: User, @Query() query: FindAllNoteQueryDto) {
    return this.noteService.findAll({ lang, user, param, query });
  }
}
