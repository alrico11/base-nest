import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { Module } from '@nestjs/common/decorators';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService]
})
export class DeviceModule { }
