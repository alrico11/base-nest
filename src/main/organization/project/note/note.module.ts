import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteModule as MainNoteModule } from 'src/main/note'
import { ProjectModule } from 'src/main/project';

@Module({
  imports: [MainNoteModule,ProjectModule],
  controllers: [NoteController],
})
export class NoteModule { }
