import { Module } from '@nestjs/common';
import { CollaboratorModule as MainCollaboratorModule } from 'src/main/project/collaborator';
import { CollaboratorController } from './collaborator.controller';
import { ProjectModule } from 'src/main/project';

@Module({
  imports:[MainCollaboratorModule,ProjectModule],
  controllers: [CollaboratorController],
})
export class CollaboratorModule {}
