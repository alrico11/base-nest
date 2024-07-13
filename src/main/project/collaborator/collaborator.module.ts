import { Module } from '@nestjs/common';
import { CollaboratorController } from './collaborator.controller';
import { CollaboratorService } from './collaborator.service';

@Module({
  controllers: [CollaboratorController],
  providers: [CollaboratorService],
  exports: [CollaboratorService]
})
export class CollaboratorModule { }
