import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { UserInstance, UserJwtGuard } from 'src/main/auth';
import { UserDeviceGuard } from 'src/main/device';
import { AddAdminProjectCollaboratorBodyDto, AddAdminProjectCollaboratorParamDto, CreateProjectCollaboratorBodyDto, CreateProjectCollaboratorParamDto, RemoveAdminProjectCollaboratorBodyDto, RemoveAdminProjectCollaboratorParamDto, RemoveProjectCollaboratorBodyDto, RemoveProjectCollaboratorParamDto } from './collaborator.dto';
import { CollaboratorService } from './collaborator.service';

@ApiHeaders(DeviceHeaders)
@ApiTags('User Organization Collaborator')
@Controller('organization/:organizationId/project/:id/collaborator')
@UseGuards(UserJwtGuard, UserDeviceGuard)
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) { }

  @Post('add-collaborator')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: 'AddCollaboratorToProject' })
  addCollaborator(@Body() body: CreateProjectCollaboratorBodyDto, @Param() param: CreateProjectCollaboratorParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.collaboratorService.addCollaborator({ body, lang, param, user });
  }

  @Post('add-admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: 'AddAdminToProject' })
  addAdmin(@Body() body: AddAdminProjectCollaboratorBodyDto, @Param() param: AddAdminProjectCollaboratorParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.collaboratorService.addAdmin({ body, lang, param, user });
  }

  @Delete('remove-admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'RemoveAdminFromProject' })
  removeAdmin(@Body() body: RemoveAdminProjectCollaboratorBodyDto, @Param() param: RemoveAdminProjectCollaboratorParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.collaboratorService.removeAdmin({ body, lang, param, user });
  }

  @Delete('remove-collaborator')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'RemoveCollaboratorFromProject' })
  removeCollaborator(@Body() body: RemoveProjectCollaboratorBodyDto, @Param() param: RemoveProjectCollaboratorParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.collaboratorService.removeCollaborator({ body, lang, param, user });
  }


}
