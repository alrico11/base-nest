import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ReminderModule } from 'src/main/reminder/reminder.module';
import { OrganizationModule } from '../organization.module';

@Module({
  imports: [ReminderModule,OrganizationModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule { }
