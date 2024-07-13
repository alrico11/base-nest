import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectModule as ProjectModuleMain} from 'src/main/project';
import { OrganizationModule } from '../organization.module';

@Module({
  imports: [ProjectModuleMain,OrganizationModule],
  controllers: [ProjectController],
})
export class ProjectModule { }
