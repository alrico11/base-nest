import { Module } from '@nestjs/common';
import { ReminderListener } from './reminder.listener';
import { ReminderService } from './reminder.service';
import { ReminderJob } from './reminder.job';
import { ProjectModule } from '../project';

@Module({
  imports:[ProjectModule],
  providers: [ReminderService, ReminderListener,ReminderJob,],
  exports: [ReminderService]
})
export class ReminderModule { }
