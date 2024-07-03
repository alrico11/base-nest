import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectListener } from './project.listener';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ProjectListener],
  exports: [ProjectService]
})
export class ProjectModule { }
