import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserBodyDto, FindAllUserQueryDto, FindOneUserParamDto, UpdateUserBodyDto } from './user.dto';
import { UserInstance, UserJwtGuard } from '../auth';
import { DeviceInstance, UserDeviceGuard } from '../device';
import { Device, User } from '@prisma/client';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';

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
  @ApiOperation({ operationId: "FindAllUser" })
  findAll(@Query() query: FindAllUserQueryDto, @Lang() lang: LangEnum) {
    return this.userService.findAll({ lang, query });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: "FindOneUser" })
  findOneDetail(@Param() param: FindOneUserParamDto, @Lang() lang: LangEnum) {
    return this.userService.findOne({ lang, param });
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: "UpdateUser" })
  update(@UserInstance() user: User, @Body() body: UpdateUserBodyDto, @Lang() lang: LangEnum) {
    return this.userService.update({ body, lang, user });
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ operationId: "RemoveUser" })
  remove(@UserInstance() user: User, @Lang() lang: LangEnum) {
    return this.userService.remove({ lang, user });
  }
}
