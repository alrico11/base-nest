import { Module } from '@nestjs/common';
import { ProjectModule, ProjectRepository } from '..';
import { EventLogController } from './event-log.controller';
import { EventLogService } from './event-log.service';
import { OrganizationModule } from 'src/main/organization';
import { OrganizationRepository } from 'src/main/organization/organization.repository';

@Module({
  imports: [ProjectModule,OrganizationModule],
  controllers: [EventLogController],
  providers: [EventLogService, ProjectRepository,OrganizationRepository],
  exports: [EventLogService]
})
export class EventLogModule { }
