import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { OrganizationController } from './organization.controller';
import { OrganizationListener } from './organization.listener';
import { OrganizationService } from './organization.service';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  imports: [MemberModule, OrganizationListener],
})
export class OrganizationModule { }
