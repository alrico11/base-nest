import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MemberService } from './member.service';
import { AddAdminOrganizationBodyDto, AddAdminOrganizationParamDto, CreateMemberOrganizationBodyDto, CreateMemberOrganizationParamDto, RemoveAdminOrganizationBodyDto, RemoveAdminOrganizationParamDto, RemoveMemberOrganizationBodyDto, RemoveMemberOrganizationParamDto } from './member.dto';
import { Lang, LangEnum } from 'src/constants';
import { UserInstance } from 'src/main/auth';
import { User } from '@prisma/client';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) { }

  @Post('add-member')
  addMember(@Body() body: CreateMemberOrganizationBodyDto, @Param() param: CreateMemberOrganizationParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.memberService.addMember({ body, param, lang, user })
  }
  @Delete('remove-member')
  removeMember(@Body() body: RemoveMemberOrganizationBodyDto, @Param() param: RemoveMemberOrganizationParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.memberService.removeMember({ body, param, lang, user })
  }
  @Post('add-admin')
  addAdmin(@Body() body: AddAdminOrganizationBodyDto, @Param() param: AddAdminOrganizationParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.memberService.addAdmin({ body, param, lang, user })
  }
  @Delete('remove-admin')
  removeAdmin(@Body() body: RemoveAdminOrganizationBodyDto, @Param() param: RemoveAdminOrganizationParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.memberService.removeAdmin({ body, param, lang, user })
  }
}
