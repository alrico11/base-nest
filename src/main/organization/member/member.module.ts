import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { OrganizationModule } from '../organization.module';
import { MemberRepository } from './member.repository';

@Module({
  imports: [OrganizationModule],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
})
export class MemberModule { }
