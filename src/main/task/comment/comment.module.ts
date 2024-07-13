import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { OrganizationModule } from 'src/main/organization';
import { ProjectModule, ProjectRepository } from 'src/main/project';
import { OrganizationRepository } from 'src/main/organization/organization.repository';

@Module({
  imports: [ProjectModule, OrganizationModule],
  controllers: [CommentController],
  providers: [CommentService, ProjectRepository, OrganizationRepository],
  exports: [CommentService]
})
export class CommentModule { }
