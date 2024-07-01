import { Controller, Post, Delete, Body, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { UserInstance, UserJwtGuard } from 'src/main/auth';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDeviceGuard } from 'src/main/device';
import { AddAdminProjectCollaboratorBodyDto, AddAdminProjectCollaboratorParamDto, CreateProjectCollaboratorBodyDto, CreateProjectCollaboratorParamDto, RemoveAdminProjectCollaboratorBodyDto, RemoveAdminProjectCollaboratorParamDto, RemoveProjectCollaboratorBodyDto, RemoveProjectCollaboratorParamDto } from './collaborator.dto';
import { CollaboratorService } from './collaborator.service';

@Controller('collaborator')
@ApiHeaders(DeviceHeaders)
@ApiTags('User Collaborator')
@UseGuards(UserJwtGuard, UserDeviceGuard)
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) { }

  @Post('add-collaborator')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: 'AddCollaborator' })
  addCollaborator(@Body() body: CreateProjectCollaboratorBodyDto, @Param() param: CreateProjectCollaboratorParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.collaboratorService.addCollaborator({ body, lang, param, user });
  }

  @Post('add-admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: 'AddAdmin' })
  addAdmin(@Body() body: AddAdminProjectCollaboratorBodyDto, @Param() param: AddAdminProjectCollaboratorParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.collaboratorService.addAdmin({ body, lang, param, user });
  }

  @Delete('remove-admin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'RemoveAdmin' })
  removeAdmin(@Body() body: RemoveAdminProjectCollaboratorBodyDto, @Param() param: RemoveAdminProjectCollaboratorParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.collaboratorService.removeAdmin({ body, lang, param, user });
  }

  @Delete('remove-collaborator')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: 'RemoveCollaborator' })
  removeCollaborator(@Body() body: RemoveProjectCollaboratorBodyDto, @Param() param: RemoveProjectCollaboratorParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.collaboratorService.removeCollaborator({ body, lang, param, user });
  }
}
