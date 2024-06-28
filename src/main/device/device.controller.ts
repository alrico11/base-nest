import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiBearerAuth, ApiBody, ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeviceHeaders, Lang, LangEnum } from 'src/constants';
import { CheckDeviceBodyDto, RegisterDeviceBodyDto, RegisterFCMTokenBodyDto } from './device.dto';
import { UserDeviceGuard } from './device.guard';
import { DeviceService } from './device.service';

@ApiTags('Device Devices')
@Controller('/device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) { }

  @Post('register')
  @ApiOperation({ operationId: 'DeviceRegisterDevice' })
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: RegisterDeviceBodyDto
  })
  registerDevice(@Lang() lang: LangEnum, @Body() body: RegisterDeviceBodyDto) {
    return this.deviceService.registerDevice({ body, lang });
  }

  @Post('check')
  @ApiOperation({ operationId: 'UserCheckDevice' })
  @HttpCode(HttpStatus.OK)
  checkDevice(@Lang() lang: LangEnum, @Body() body: CheckDeviceBodyDto) {
    return this.deviceService.checkDevice({ body, lang });
  }

  @Post('fcm/register')
  @ApiOperation({ operationId: 'UserRegisterFCMToken' })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(UserDeviceGuard)
  @ApiHeaders(DeviceHeaders)
  @ApiBearerAuth()
  registerFcmToken(@Lang() lang: LangEnum, @Body() body: RegisterFCMTokenBodyDto) {
    return this.deviceService.registerFcm({ body, lang });
  }
}
