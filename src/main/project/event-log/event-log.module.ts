import { Module } from '@nestjs/common';
import { ProjectModule, ProjectRepository } from '..';
import { EventLogController } from './event-log.controller';
import { EventLogService } from './event-log.service';

@Module({
  imports: [ProjectModule],
  controllers: [EventLogController],
  providers: [EventLogService, ProjectRepository],
  exports: [EventLogService]
})
export class EventLogModule { }
