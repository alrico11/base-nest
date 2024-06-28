import { Module } from '@nestjs/common';
import { FileModule } from 'src/file';
import { TagModule } from '../tag/tag.module';
import { DepartementModule } from './departement/departement.module';
import { JobModule } from './job/job.module';
import { OrganizationController } from './organization.controller';
import { OrganizationListener } from './organization.listener';
import { OrganizationService } from './organization.service';
import { PositionModule } from './position/position.module';
import { ProjectModule } from './project/project.module';
import { SopModule } from './sop/sop.module';

@Module({
  imports: [FileModule, DepartementModule, PositionModule, JobModule, SopModule, ProjectModule, TagModule],
  controllers: [OrganizationController],
  providers: [OrganizationService, OrganizationListener],
})
export class OrganizationModule { }
