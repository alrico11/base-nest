import { Module } from '@nestjs/common';
import { OrganizationModule } from '../organization';
import { MemberModule, MemberService } from '../organization/member';
import { OrganizationRepository } from '../organization/organization.repository';
import { ProjectModule, ProjectRepository } from '../project';
import { CollaboratorModule, CollaboratorService } from '../project/collaborator';
import { ReminderModule } from '../reminder/reminder.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CollaboratorRepository } from '../project/collaborator/collaborator.repository';
import { MemberRepository } from '../organization/member/member.repository';

@Module({
  imports: [ReminderModule, ProjectModule, CollaboratorModule, MemberModule, OrganizationModule],
  controllers: [TaskController],
  providers: [TaskService, ProjectRepository, CollaboratorService, MemberService, OrganizationRepository,CollaboratorRepository, MemberRepository],
  exports: [TaskService]
})
export class TaskModule { }
