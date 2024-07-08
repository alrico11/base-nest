import { Module } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { ReminderListener } from './reminder.listener';

@Module({
  providers: [ReminderService, ReminderListener],
  exports: [ReminderService]
})
export class ReminderModule { }
