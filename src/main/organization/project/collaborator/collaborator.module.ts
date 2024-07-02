import { Module } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorController } from './collaborator.controller';
import { ProjectModule } from '../project.module';

@Module({
  imports: [ProjectModule],
  controllers: [CollaboratorController],
  providers: [CollaboratorService],
})
export class CollaboratorModule { }
