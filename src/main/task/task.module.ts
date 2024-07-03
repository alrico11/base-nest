import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ReminderModule } from '../reminder/reminder.module';

@Module({
  imports: [ReminderModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule { }
