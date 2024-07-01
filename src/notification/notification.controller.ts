import { Controller, Get, HttpCode, Param, Query, UseGuards } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiBearerAuth, ApiHeaders, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { NotificationParamDto, NotificationQueryDto } from './notification.dto';
import { NotificationService } from './notification.service';
import { DeviceHeaders } from 'src/constants';
import { UserJwtGuard } from 'src/main/auth';

@ApiTags('Main Notification')
@ApiHeaders(DeviceHeaders)
@ApiBearerAuth()
@Controller('main/notification')
@UseGuards(UserJwtGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }
  // @Get()
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({operationId : "MainFindAllNotification"})
  // findAll(@Lang() lang: LangEnumType, @Query() query: NotificationQueryDto, @UserInstance() user: User) {
  //   return this.notificationService.findAll({ lang, query, user });
  // }

}
