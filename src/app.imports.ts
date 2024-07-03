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
import { TagModule as MainProjectTagModule } from "./main/tag/tag.module"
import { TaskModule as MainTaskModule } from "./main/task"
import { UserModule } from "./main/user/user.module"
import { PrismaModule } from "./prisma"
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
  //ON TESTING
  AuthModule,
  MainDeviceModule,
  UserModule,
  //ORGANIZATION
  MainOrganizationModule,
  MainOrganizationTagModule,
  MainOrganizationProjectModule,
  MainOrganizationProjectCollaboratorModule,
  MainOrganizationMemberModule,
  //MAIN PROJECT
  MainProjectCollaboratorModule,
  MainProjectTagModule,
  //MAIN
  MainTaskModule
]

export default AppImports
