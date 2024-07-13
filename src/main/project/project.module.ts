import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { OrganizationModule } from '../organization';
import { OrganizationRepository } from '../organization/organization.repository';

@Module({
  imports:[OrganizationModule],
  controllers: [ProjectController],
  providers: [ProjectService,OrganizationRepository],
  exports: [ProjectService]
})
export class ProjectModule { }
