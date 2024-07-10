import { Module } from '@nestjs/common';
import { ReminderListener } from './reminder.listener';
import { ReminderService } from './reminder.service';

@Module({
  providers: [ReminderService, ReminderListener],
  exports: [ReminderService]
})
export class ReminderModule { }
