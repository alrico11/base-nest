import { Module } from '@nestjs/common';
import { NoteModule as MainNoteModule } from 'src/main/note';
import { NoteController } from './note.controller';
import { ProjectModule } from '../project.module';

@Module({
  imports: [MainNoteModule, ProjectModule],
  controllers: [NoteController],
})
export class NoteModule { }
