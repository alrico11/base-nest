import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { MemberService } from './member.service';
import { AddAdminOrganizationBodyDto, AddAdminOrganizationParamDto, CreateMemberOrganizationBodyDto, CreateMemberOrganizationParamDto, RemoveAdminOrganizationBodyDto, RemoveAdminOrganizationParamDto, RemoveMemberOrganizationBodyDto, RemoveMemberOrganizationParamDto } from './member.dto';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { UserInstance, UserJwtGuard } from 'src/main/auth';
import { User } from '@prisma/client';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDeviceGuard } from 'src/main/device';
import { AdminGuard } from '../admin.guard';

@Controller('organization/:id/member')
@ApiHeaders(DeviceHeaders)
// @UseGuards(UserJwtGuard, UserDeviceGuard)
@UseGuards(UserJwtGuard)
@ApiTags("User Organization Member")
export class MemberController {
  constructor(private readonly memberService: MemberService) { }

  @Post('add-member')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: "CreateMemberOrganization" })
  @UseGuards(AdminGuard)
  addMember(@Body() body: CreateMemberOrganizationBodyDto, @Param() param: CreateMemberOrganizationParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.memberService.addMember({ body, param, lang, user })
  }
  @Delete('remove-member')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @ApiOperation({ operationId: "DeleteMemberOrganization" })
  removeMember(@Body() body: RemoveMemberOrganizationBodyDto, @Param() param: RemoveMemberOrganizationParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.memberService.removeMember({ body, param, lang, user })
  }
  @Post('add-admin')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AdminGuard)
  @ApiOperation({ operationId: "CreateAdminOrganization" })
  addAdmin(@Body() body: AddAdminOrganizationBodyDto, @Param() param: AddAdminOrganizationParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.memberService.addAdmin({ body, param, lang, user })
  }
  @Delete('remove-admin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminGuard)
  @ApiOperation({ operationId: "DeleteAdminOrganization" })
  removeAdmin(@Body() body: RemoveAdminOrganizationBodyDto, @Param() param: RemoveAdminOrganizationParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.memberService.removeAdmin({ body, param, lang, user })
  }
}
