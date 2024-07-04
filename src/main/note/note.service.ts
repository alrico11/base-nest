import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { ICreateNote } from './note.@types';
import { ReminderService } from '../reminder/reminder.service';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import { LangResponse } from 'src/constants';

dayjs.extend(utc)
@Injectable()
export class NoteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reminderService: ReminderService
  ) { }
  async create({ body, lang, user }: ICreateNote) {
    const { reminder, ...data } = body
    const note = await this.prisma.note.create({ data })
    if (reminder) {
      const { startDate, time, ...rest } = reminder
      const hours = parseInt(time.split(':')[0])
      const minutes = parseInt(time.split(':')[1])
      this.reminderService.createReminderNote({
        note,
        reminder: {
          dateReminder: dayjs.utc(startDate).toDate(),
          timeReminder: dayjs().set('hour', hours).set('minute', minutes).set('second', 0).toDate(),
          ...rest
        }
      })
    }
    return { message: LangResponse({ key: "created", lang, object: "note" }) };
  }

  // findAll() {
  //   return `This action returns all note`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} note`;
  // }

  // update(id: number, updateNoteDto: UpdateNoteDto) {
  //   return `This action updates a #${id} note`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} note`;
  // }
}
