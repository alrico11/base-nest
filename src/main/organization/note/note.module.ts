import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteModule as MainNoteModule } from 'src/main/note'

@Module({
  imports: [MainNoteModule],
  controllers: [NoteController],
})
export class NoteModule { }
