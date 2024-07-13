import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { OrganizationModule } from '../organization';
import { OrganizationRepository } from '../organization/organization.repository';

@Module({
  imports:[OrganizationModule],
  controllers: [TagController],
  providers: [TagService,OrganizationRepository],
  exports:[TagService]
})
export class TagModule {}
