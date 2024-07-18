import { Module } from '@nestjs/common';
import { ReminderModule } from '../reminder/reminder.module';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { ProjectModule, ProjectRepository } from '../project';
import { OrganizationModule } from '../organization';
import { OrganizationRepository } from '../organization/organization.repository';

@Module({
  imports: [ReminderModule, ProjectModule, OrganizationModule],
  controllers: [NoteController],
  providers: [NoteService, OrganizationRepository, ProjectRepository],
  exports: [NoteService]
})
export class NoteModule { }
