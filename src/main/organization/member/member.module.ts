import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { OrganizationModule } from '../organization.module';

@Module({
  imports: [OrganizationModule],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule { }
