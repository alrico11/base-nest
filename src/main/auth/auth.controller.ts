import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Device, User } from '@prisma/client';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { DeviceInstance } from '../device';
import { UserDeviceGuard } from '../device/device.guard';
import { LoginBodyDto } from './auth.dto';
import { AuthService } from './auth.service';
import { UserJwtGuard } from './jwt.guard';
import { UserInstance } from './user.decorator';

@Controller('auth')
@ApiTags('Main Auth')
@ApiHeaders(DeviceHeaders)
@UseGuards(UserDeviceGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ operationId: 'UserLogin' })
  @ApiBody({ type: LoginBodyDto })
  login(@Lang() lang: LangEnum, @Body() body: LoginBodyDto, @DeviceInstance() device: Device) {
    return this.authService.login({ body, device, lang });
  }

  @Post('logout')
  @UseGuards(UserJwtGuard)
  @HttpCode(200)
  @ApiOperation({ operationId: 'UserLogout' })
  @ApiBearerAuth()
  logout(@Lang() lang: LangEnum, @DeviceInstance() device: Device, @UserInstance() user: User) {
    return this.authService.logout({ device, user, lang });
  }
}
