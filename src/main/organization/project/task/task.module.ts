import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ReminderModule } from 'src/main/reminder/reminder.module';
import { ProjectModule } from '../project.module';

@Module({
  imports: [ReminderModule, ProjectModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule { }
