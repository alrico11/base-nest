import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ReminderModule } from '../reminder/reminder.module';
import { ProjectModule, ProjectRepository } from '../project';

@Module({
  imports: [ReminderModule, ProjectModule],
  controllers: [TaskController],
  providers: [TaskService, ProjectRepository],
  exports: [TaskService]
})
export class TaskModule { }
