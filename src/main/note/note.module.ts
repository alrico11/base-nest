import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { ReminderModule } from '../reminder/reminder.module';

@Module({
  imports :[ReminderModule],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
