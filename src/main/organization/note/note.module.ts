import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteModule as MainNoteModule } from 'src/main/note'
import { OrganizationModule } from '../organization.module';

@Module({
  imports: [MainNoteModule,OrganizationModule],
  controllers: [NoteController],
})
export class NoteModule { }
