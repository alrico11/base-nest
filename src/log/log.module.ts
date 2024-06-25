import { Global, Module } from '@nestjs/common';
import { LogScheduler } from './log.scheduler';
import { LogService } from './log.service';

@Global()
@Module({
  providers: [LogService, LogScheduler],
  exports: [LogService]
})
export class LogModule { }
