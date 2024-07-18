import { Module } from '@nestjs/common';
import { CollaboratorController } from './collaborator.controller';
import { CollaboratorService } from './collaborator.service';
import { MemberModule, MemberService } from 'src/main/organization/member';
import { OrganizationModule } from 'src/main/organization';
import { OrganizationRepository } from 'src/main/organization/organization.repository';
import { CollaboratorRepository } from './collaborator.repository';
import { MemberRepository } from 'src/main/organization/member/member.repository';

@Module({
  imports: [MemberModule, OrganizationModule],
  controllers: [CollaboratorController],
  providers: [CollaboratorService, MemberService, OrganizationRepository, CollaboratorRepository, MemberRepository],
  exports: [CollaboratorService]
})
export class CollaboratorModule { }
