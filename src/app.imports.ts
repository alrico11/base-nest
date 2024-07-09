import { DynamicModule, ForwardReference, Type } from "@nestjs/common"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { RateLimiterModule } from "nestjs-rate-limiter"
import { FileModule } from "./file"
import { LogModule } from "./log"
import { AuthModule } from "./main/auth"
import { CommentModule as MainCommentModule } from "./main/comment"
import { DeviceModule as MainDeviceModule } from "./main/device"
import { NoteModule as MainNoteModule } from "./main/note/note.module"
import { MemberModule as MainOrganizationMemberModule } from "./main/organization/member"
import { NoteModule as MainOrganizationNoteModule } from "./main/organization/note"
import { OrganizationModule as MainOrganizationModule } from "./main/organization/organization.module"
import { ProjectModule as MainOrganizationProjectModule } from "./main/organization/project"
import { CollaboratorModule as MainOrganizationProjectCollaboratorModule } from "./main/organization/project/collaborator"
import { NoteModule as MainOrganizationProjectNoteModule } from "./main/organization/project/note"
import { TaskModule as MainOrganizationProjectTaskModule } from "./main/organization/project/task"
import { TagModule as MainOrganizationTagModule } from "./main/organization/tag"
import { TaskModule as MainOrganizationTaskModule } from "./main/organization/task"
import { CollaboratorModule as MainProjectCollaboratorModule } from "./main/project/collaborator"
import { NoteModule as MainProjectNoteModule } from "./main/project/note"
import { TaskModule as MainProjectTaskModule } from "./main/project/task"
import { ReminderModule as MainReminderModule } from "./main/reminder/reminder.module"
import { TagModule as MainTagModule } from "./main/tag/tag.module"
import { TaskModule as MainTaskModule } from "./main/task"
import { UserModule } from "./main/user/user.module"
import { NotificationModule } from "./notification"
import { PrismaModule } from "./prisma"
import { SchedulerModule } from "./scheduler"
import { SeederModule } from "./seeder"
import { XConfigModule } from "./xconfig"

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
  //ON TESTING
  AuthModule,
  MainDeviceModule,
  UserModule,

  //ORGANIZATION
  MainOrganizationModule,
  MainOrganizationTagModule,
  MainOrganizationMemberModule,
  MainOrganizationTaskModule,
  MainOrganizationNoteModule,

  //Main Organization Project
  MainOrganizationProjectCollaboratorModule,
  MainOrganizationProjectModule,
  MainOrganizationProjectTaskModule,
  MainOrganizationProjectNoteModule,
  // organization project activitylog

  //MAIN PROJECT
  MainProjectCollaboratorModule,
  MainProjectTaskModule,
  MainProjectNoteModule,
  // activity log

  //MAIN
  MainTagModule,
  MainTaskModule,
  MainReminderModule,
  MainNoteModule,
  MainCommentModule
  //chat
]

export default AppImports
