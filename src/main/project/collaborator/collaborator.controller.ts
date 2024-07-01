import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { Lang, LangEnum } from 'src/constants';
import { UserInstance } from 'src/main/auth';
import { AddAdminProjectCollaboratorBodyDto, AddAdminProjectCollaboratorParamDto, CreateProjectCollaboratorBodyDto, CreateProjectCollaboratorParamDto, RemoveAdminProjectCollaboratorBodyDto, RemoveAdminProjectCollaboratorParamDto, RemoveProjectCollaboratorBodyDto, RemoveProjectCollaboratorParamDto } from './collaborator..dto';
import { CollaboratorService } from './collaborator.service';

@Controller('collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) { }

  @Post('add-collaborator')
  addCollaborator(@Body() body: CreateProjectCollaboratorBodyDto, @Param() param: CreateProjectCollaboratorParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.collaboratorService.addCollaborator({ body, lang, param, user })
  }
  @Post('add-admin')
  addAdmin(@Body() body: AddAdminProjectCollaboratorBodyDto, @Param() param: AddAdminProjectCollaboratorParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.collaboratorService.addAdmin({ body, lang, param, user })
  }
  @Delete('remove-admin')
  removeAdmin(@Body() body: RemoveAdminProjectCollaboratorBodyDto, @Param() param: RemoveAdminProjectCollaboratorParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.collaboratorService.removeAdmin({ body, lang, param, user })
  }
  @Delete('remove-collaborator')
  removeMember(@Body() body: RemoveProjectCollaboratorBodyDto, @Param() param: RemoveProjectCollaboratorParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.collaboratorService.removeCollaborator({ body, lang, param, user })
  }
}