import { Module } from '@nestjs/common';
import { TaskModule as MainTaskModule } from 'src/main/task';
import { TaskController } from './task.controller';

@Module({
  imports: [MainTaskModule],
  controllers: [TaskController],
})
export class TaskModule { }
