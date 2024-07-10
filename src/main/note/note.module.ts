import { Module } from '@nestjs/common';
import { ReminderModule } from '../reminder/reminder.module';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { OrganizationModule } from '../organization/organization.module';
import { ProjectModule as OrganizationProjectModule } from '../organization/project';
import { ProjectModule } from '../project';

@Module({
  imports: [ReminderModule, OrganizationModule, OrganizationProjectModule, ProjectModule],
  controllers: [NoteController],
  providers: [NoteService],
  exports: [NoteService]
})
export class NoteModule { }
