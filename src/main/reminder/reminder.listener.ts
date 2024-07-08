import { Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { CreateReminderNoteEvent } from "./reminder.event"
import { SchedulerCreateReminderNoteEvent } from "src/scheduler/scheduler.event";
@Injectable()
export class ReminderListener {
    constructor(
        private readonly ee: EventEmitter2
    ) { }
    @OnEvent(CreateReminderNoteEvent.key)
    handleShowReminderNoteEvent({ data: { note, lang, reminder, user, organization, project } }: CreateReminderNoteEvent) {
        this.ee.emit(SchedulerCreateReminderNoteEvent.key, new SchedulerCreateReminderNoteEvent({ lang, reminder, user, organization, project, note }))
    }
}