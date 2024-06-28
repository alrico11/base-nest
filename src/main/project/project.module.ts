import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { ActivityLogModule } from './activity-log/activity-log.module';
import { TaskModule } from './task/task.module';
import { NoteModule } from './note/note.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [CollaboratorModule, ActivityLogModule, TaskModule, NoteModule],
})
export class ProjectModule {}
