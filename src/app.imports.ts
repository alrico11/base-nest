import { DynamicModule, ForwardReference, Type } from "@nestjs/common"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { RateLimiterModule } from "nestjs-rate-limiter"
import { FileModule } from "./file"
import { LogModule } from "./log"
import { AuthModule } from "./main/auth"
import { DeviceModule as MainDeviceModule } from "./main/device"
import { MemberModule as MainOrganizationMemberModule } from "./main/organization/member"
import { OrganizationModule as MainOrganizationModule } from "./main/organization/organization.module"
import { ProjectModule as MainOrganizationProjectModule } from "./main/organization/project"
import { CollaboratorModule as MainOrganizationProjectCollaboratorModule } from "./main/organization/project/collaborator"
import { TagModule as MainOrganizationTagModule } from "./main/organization/tag"
import { CollaboratorModule as MainProjectCollaboratorModule } from "./main/project/collaborator"
import { TagModule as MainTagModule } from "./main/tag/tag.module"
import { TaskModule as MainTaskModule } from "./main/task"
import { UserModule } from "./main/user/user.module"
import { PrismaModule } from "./prisma"
import { SeederModule } from "./seeder"
import { XConfigModule } from "./xconfig"
import { TaskModule as MainProjectTaskModule } from "./main/project/task"
import { TaskModule as MainOrganizationTaskModule } from "./main/organization/task"
import { TaskModule as MainOrganizationProjectTaskModule } from "./main/organization/project/task"

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
  //ON TESTING
  AuthModule,
  MainDeviceModule,
  UserModule,
  
  //ORGANIZATION
  MainOrganizationModule,
  MainOrganizationTagModule,
  MainOrganizationMemberModule,
  MainOrganizationTaskModule,
  
  //Main Organization Project
  MainOrganizationProjectCollaboratorModule,
  MainOrganizationProjectModule,
  MainOrganizationProjectTaskModule,
  // organization project note
  // organization project activitylog

  //MAIN PROJECT
  MainProjectCollaboratorModule,
  MainProjectTaskModule,
  // project note
  // activity log

  //MAIN
  MainTagModule,
  MainTaskModule,
  //note
  //comment
  //chat
]

export default AppImports
