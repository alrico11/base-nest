import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { IntervalReminder, LangDeviceEnum } from "@prisma/client";
import { LangEnum, LangNotification } from "src/constants";
import { NotificationCreateEvent } from "src/notification/notification.event";
import { PrismaService } from "src/prisma";
import { SchedulerCreateReminderNoteEvent, SchedulerCreateReminderTaskEvent, SchedulerDeleteReminderNoteEvent, SchedulerReminderDeleteTaskEvent, SchedulerUpdateReminderNoteEvent, SchedulerUpdateReminderTaskEvent } from "src/scheduler/scheduler.event";
import { ProjectService } from "../project";
import { CreateReminderNoteEvent, CreateReminderNotificationEvent, CreateReminderTaskEvent, DeleteReminderNoteEvent, DeleteReminderTaskEvent, UpdateReminderNoteEvent, UpdateReminderTaskEvent } from "./reminder.event";
@Injectable()
export class ReminderListener {
    constructor(
        private readonly ee: EventEmitter2,
        private readonly prisma: PrismaService,
        private readonly projectService: ProjectService
    ) { }
    //HANDLE NOTIFICATION
    @OnEvent(CreateReminderNotificationEvent.key)
    async handleCreateReminderNotificationEvent({ data: { lang, note, reminder, user, organization, project, task } }: CreateReminderNotificationEvent) {
        const item = note || task;
        if (!item) {
            throw new Error("Neither note nor task is provided.");
        }

        const itemType = note ? 'note' : 'task';
        const itemTitle = note ? note.title : task!.name;
        let tokensID: string[] = [];
        let tokensEN: string[] = [];
        let scope = `${itemType}/${item.id}`;

        if (project) {
            scope = `project/${project.id}/${scope}`;
            const collaborators = await this.projectService.getCollaborator(project);

            if (collaborators && collaborators.length > 0) {
                collaborators.forEach(({ fcmToken, lang }) => {
                    if (lang === "EN") {
                        tokensEN.push(fcmToken);
                    } else {
                        tokensID.push(fcmToken);
                    }
                });
            }
        } else {
            const userDevice = await this.prisma.userDevice.findFirst({
                where: { userId: user.id },
                include: { Device: true }
            });

            if (!userDevice || !userDevice.Device.fcmToken) {
                throw new HttpException('FCM TOKEN NOT FOUND', HttpStatus.BAD_REQUEST);
            }

            if (userDevice.Device.lang === "ID") {
                tokensID.push(userDevice.Device.fcmToken);
            } else {
                tokensEN.push(userDevice.Device.fcmToken);
            }
        }

        if (organization) {
            scope = `organization/${organization.id}/${scope}`;
        }

        const sendNotification = (tokens: string[], lang: LangDeviceEnum) => {
            const body = task
                ? `${LangNotification({ key: "reminderTask", lang })} ${itemTitle}`
                : `${LangNotification({ key: "reminderNote", lang })} ${itemTitle}`;

            this.ee.emit(NotificationCreateEvent.key, new NotificationCreateEvent({
                data: { collapseKey: `${itemType}Reminder`, type: "reminder", data: reminder.id },
                fcm: { title: LangNotification({ key: "reminder", lang }), body },
                scope,
                user,
                tokens,
                save: false
            }));
        };

        if (tokensID.length > 0) sendNotification(tokensID, LangDeviceEnum.ID);
        if (tokensEN.length > 0) sendNotification(tokensEN, LangDeviceEnum.EN);

        const newReminder = await this.prisma.reminder.findFirst({ where: { id: reminder.id, deletedAt: null } });
        if (newReminder && newReminder.interval !== IntervalReminder.ONCE) {
            if (note) {
                this.ee.emit(SchedulerCreateReminderNoteEvent.key, new SchedulerCreateReminderNoteEvent({
                    lang, note, reminder: newReminder, user, organization, project
                }));
            } else if (task) {
                this.ee.emit(SchedulerCreateReminderTaskEvent.key, new SchedulerCreateReminderTaskEvent({
                    lang, task, reminder: newReminder, user, organization, project
                }));
            }
        }

        if (reminder.interval === IntervalReminder.ONCE) {
            if (note) {
                await this.prisma.reminderNote.delete({ where: { reminderId: reminder.id } });
            }
            if (task) {
                await this.prisma.reminderTask.delete({ where: { reminderId: reminder.id } });
            }
        }
    }

    //NOTE
    @OnEvent(CreateReminderNoteEvent.key)
    handleShowReminderNoteEvent({ data: { note, lang, reminder, user, organization, project } }: CreateReminderNoteEvent) {
        this.ee.emit(SchedulerCreateReminderNoteEvent.key, new SchedulerCreateReminderNoteEvent({ lang, reminder, user, organization, project, note }))
    }

    //ON TESTING
    @OnEvent(UpdateReminderNoteEvent.key)
    handleUpdateReminderNoteEvent({ data: { note, lang, reminder, user, organization, project } }: UpdateReminderNoteEvent) {
        this.ee.emit(SchedulerUpdateReminderNoteEvent.key, new SchedulerUpdateReminderNoteEvent({ lang, reminder, user, organization, project, note }))
    }
    @OnEvent(DeleteReminderNoteEvent.key)
    handleDeleteReminderNoteEvent({ data: { reminder } }: DeleteReminderNoteEvent) {
        this.ee.emit(SchedulerDeleteReminderNoteEvent.key, new SchedulerDeleteReminderNoteEvent({ reminder }))
    }

    //TASK
    @OnEvent(CreateReminderTaskEvent.key)
    handleCreateReminderTaskEvent({ data: { lang, reminder, task, user, organization, project } }: CreateReminderTaskEvent) {
        this.ee.emit(SchedulerCreateReminderTaskEvent.key, new SchedulerCreateReminderTaskEvent({ lang, reminder, task, user, organization, project }))
    }

    @OnEvent(UpdateReminderTaskEvent.key)
    handleUpdateReminderTaskEvent({ data: { lang, reminder, task, user, organization, project } }: UpdateReminderTaskEvent) {
        this.ee.emit(SchedulerUpdateReminderTaskEvent.key, new SchedulerUpdateReminderTaskEvent({ lang, reminder, task, user, organization, project }))
    }

    @OnEvent(DeleteReminderTaskEvent.key)
    handleDeleteReminderTaskEvent({ data: { reminder } }: DeleteReminderTaskEvent) {
        this.ee.emit(SchedulerReminderDeleteTaskEvent.key, new SchedulerReminderDeleteTaskEvent({ reminder }))
    }
}