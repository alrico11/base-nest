import { DynamicModule, ForwardReference, Type } from "@nestjs/common"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { RateLimiterModule } from "nestjs-rate-limiter"
import { FileModule } from "./file"
import { LogModule } from "./log"
import { AuthModule } from "./main/auth"
import { DeviceModule as MainDeviceModule } from "./main/device"
import { NoteModule as MainNoteModule } from "./main/note"
import { OrganizationModule as MainOrganizationModule } from "./main/organization"
import { MemberModule as MainOrganizationMemberModule } from "./main/organization/member"
import { NoteModule as MainOrganizationNoteModule } from "./main/organization/note"
import { ProjectModule as MainOrganizationProjectModule } from "./main/organization/project"
import { CollaboratorModule as MainOrganizationProjectCollaboratorModule } from "./main/organization/project/collaborator"
import { NoteModule as MainOrganizationProjectNoteModule } from "./main/organization/project/note"
import { TaskModule as MainOrganizationProjectTaskModule } from "./main/organization/project/task"
import { CommentModule as MainOrganizationProjectTaskCommentModule } from "./main/organization/project/task/comment"
import { TagModule as MainOrganizationTagModule } from "./main/organization/tag"
import { TaskModule as MainOrganizationTaskModule } from "./main/organization/task"
import { CommentModule as MainOrganizationTaskCommentModule } from "./main/organization/task/comment"
import { CollaboratorModule as MainProjectCollaboratorModule } from "./main/project/collaborator"
import { EventLogModule as MainProjectEventLogModule } from "./main/project/event-log"
import { NoteModule as MainProjectNoteModule } from "./main/project/note"
import { TaskModule as MainProjectTaskModule } from "./main/project/task"
import { CommentModule as MainProjectTaskComment } from "./main/project/task/comment"
import { ReminderModule as MainReminderModule } from "./main/reminder"
import { TagModule as MainTagModule } from "./main/tag"
import { TaskModule as MainTaskModule } from "./main/task"
import { CommentModule as MainCommentModule } from "./main/task/comment"
import { UserModule } from "./main/user/user.module"
import { NotificationModule } from "./notification"
import { PrismaModule } from "./prisma"
import { SchedulerModule } from "./scheduler"
import { SeederModule } from "./seeder"
import { XConfigModule } from "./xconfig"
import { MailModule } from "./mail"

const AppImports: (Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference<any>)[] = [
  XConfigModule,
  EventEmitterModule.forRoot({
    maxListeners: 3000,
    verboseMemoryLeak: true
  }),
  RateLimiterModule.register({
    type: 'Memory',
    points: 300,
    duration: 60,
  }),
  SeederModule,
  LogModule,
  FileModule,
  PrismaModule,
  SchedulerModule,
  NotificationModule,
  MailModule,
  //ON TESTING
  AuthModule,
  MainDeviceModule,
  UserModule,

  //ORGANIZATION
  MainOrganizationModule,
  MainOrganizationTagModule,
  MainOrganizationMemberModule,
  MainOrganizationTaskModule,
  MainOrganizationTaskCommentModule,
  MainOrganizationNoteModule,

  //Main Organization Project
  MainOrganizationProjectCollaboratorModule,
  MainOrganizationProjectModule,
  MainOrganizationProjectTaskModule,
  MainOrganizationProjectTaskCommentModule,
  MainOrganizationProjectNoteModule,

  // organization project activitylog

  //MAIN PROJECT
  MainProjectCollaboratorModule,
  MainProjectTaskModule,
  MainProjectTaskComment,
  MainProjectNoteModule,
  MainProjectEventLogModule,

  //MAIN
  MainTagModule,
  MainTaskModule,
  MainReminderModule,
  MainNoteModule,
  MainCommentModule
  //chat
]

export default AppImports
