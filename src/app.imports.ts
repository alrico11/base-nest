import { DynamicModule, ForwardReference, Type } from "@nestjs/common"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { RateLimiterModule } from "nestjs-rate-limiter"
import { PrismaModule } from "./prisma"
import { DeviceModule as MainDeviceModule } from "./main/device"
import { LogModule } from "./log"
import { XConfigModule } from "./xconfig"
import { OrganizationModule as MainOrganizationModule } from "./main/organization/organization.module"
import { TagModule as MainProjectTagModule } from "./main/tag/tag.module"
import { TagModule as MainOrganizationTagModule } from "./main/organization/tag"
import { CollaboratorModule as MainProjectCollaboratorModule } from "./main/project/collaborator"
import { MemberModule as MainOrganizationMemberModule } from "./main/organization/member/member.module"
import { ProjectModule as MainOrganizationProjectModule } from "./main/organization/project"
import { CollaboratorModule as MainOrganizationProjectCollaboratorModule } from "./main/organization/project/collaborator"
import { FileModule } from "./file"
import { AuthModule } from "./main/auth"
import { UserModule } from "./main/user/user.module"
import { SeederModule } from "./seeder"

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
]

export default AppImports
