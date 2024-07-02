import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserBodyDto } from './user.dto';
import { UserJwtGuard } from '../auth';
import { DeviceInstance, UserDeviceGuard } from '../device';
import { Device } from '@prisma/client';
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

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
