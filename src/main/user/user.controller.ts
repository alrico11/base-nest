import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Device, User } from '@prisma/client';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { UserInstance, UserJwtGuard } from '../auth';
import { DeviceInstance, UserDeviceGuard } from '../device';
import { CheckRequestPasswordUserParamDto, ConfirmChangePasswordUserBodyDto, ConfirmChangePasswordUserParamDto, CreateUserBodyDto, FindAllUserQueryDto, FindOneUserParamDto, RequestChangePasswordUserBodyDto, UpdateUserBodyDto } from './user.dto';
import { UserService } from './user.service';

@ApiHeaders(DeviceHeaders)
@Controller('user')
@ApiTags("User Manage")
@UseGuards(UserDeviceGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ operationId: "CreateUser" })
  @Post()
  create(@Body() body: CreateUserBodyDto, @DeviceInstance() device: Device, @Lang() lang: LangEnum) {
    return this.userService.create({ body, device, lang });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserJwtGuard)
  @ApiOperation({ operationId: "FindAllUser" })
  findAll(@Query() query: FindAllUserQueryDto, @Lang() lang: LangEnum) {
    return this.userService.findAll({ lang, query });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserJwtGuard)
  @ApiOperation({ operationId: "FindOneUser" })
  findOneDetail(@Param() param: FindOneUserParamDto, @Lang() lang: LangEnum) {
    return this.userService.findOne({ lang, param });
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserJwtGuard)
  @ApiOperation({ operationId: "UpdateUser" })
  update(@UserInstance() user: User, @Body() body: UpdateUserBodyDto, @Lang() lang: LangEnum) {
    return this.userService.update({ body, lang, user });
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserJwtGuard)
  @ApiOperation({ operationId: "RemoveUser" })
  remove(@UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.userService.remove({ lang, user });
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  requestResetPassword(@Body() body: RequestChangePasswordUserBodyDto, @Lang() lang: LangEnum) {
    return this.userService.requestResetPassword({ body, lang })
  }

  @Post('check-reset-password/:token')
  @HttpCode(HttpStatus.OK)
  checkRequestPassword(@Param() param: CheckRequestPasswordUserParamDto, @Lang() lang: LangEnum) {
    return this.userService.checkRequestPassword({ lang, param })
  }

  @Post('confirm-change-password/:token')
  @HttpCode(HttpStatus.OK)
  confirmChangePassword(@Param() param: ConfirmChangePasswordUserParamDto, @Body() body: ConfirmChangePasswordUserBodyDto, @DeviceInstance() device: Device, @Lang() lang: LangEnum) {
    return this.userService.confirmChangePassword({ body, device, lang, param })
  }
}
