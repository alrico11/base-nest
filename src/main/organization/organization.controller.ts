import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { UserInstance, UserJwtGuard } from '../auth';
import { UserDeviceGuard } from '../device';
import { CreateOrganizationBodyDto, DeleteOrganizationParamDto, FindAllMemberOrganizationParamDto, FindAllMemberOrganizationQueryDto, FindAllOrganizationQueryDto, FindOneOrganizationParamDto, UpdateOrganizationBodyDto, UpdateOrganizationParamDto } from './organization.dto';
import { OrganizationService } from './organization.service';

@ApiHeaders(DeviceHeaders)
@UseGuards(UserJwtGuard, UserDeviceGuard)
@ApiTags("User Organization")
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: "CreateOrganization" })
  @Post()
  create(@Body() body: CreateOrganizationBodyDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.organizationService.create({ body, lang, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: "FindAllOrganization" })
  @Get()
  findAll(@Query() query: FindAllOrganizationQueryDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.organizationService.findAll({ lang, query, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: "FindOneOrganization" })
  @Get(':id')
  findOne(@Param() param: FindOneOrganizationParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.organizationService.findOne({ param, lang, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: "UpdateOrganization" })
  @Patch(':id')
  update(@Param() param: UpdateOrganizationParamDto, @Body() body: UpdateOrganizationBodyDto, @UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.organizationService.update({ body, lang, param, user });
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: "DeleteOrganization" })
  @Delete(':id')
  remove(@Param() param: DeleteOrganizationParamDto, @Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.organizationService.remove({ lang, param, user });
  }
  
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: "FindAllMember" })
  @Get(':id/member')
  findAllMember(@Query() query: FindAllMemberOrganizationQueryDto, @Param() param: FindAllMemberOrganizationParamDto,@Lang() lang: LangEnum, @UserInstance() user: User) {
    return this.organizationService.findAllMember({ lang, param, query, user })
  }
}
