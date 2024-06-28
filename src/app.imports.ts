import { DynamicModule, ForwardReference, Type } from "@nestjs/common"
import { EventEmitterModule } from "@nestjs/event-emitter"
import { RateLimiterModule } from "nestjs-rate-limiter"
import { PrismaModule } from "./prisma"
import { DeviceModule as UserDeviceModule } from "./main/device"
import { LogModule } from "./log"
import { XConfigModule } from "./xconfig"
import { OrganizationModule as UserOrganizationModule } from "./main/organization/organization.module"
import { TagModule as UserTagModule } from "./main/tag/tag.module"
import { TagModule as OrganizationTagModule } from "./main/organization/tag/tag.module"

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
  LogModule,
  PrismaModule,
  UserDeviceModule,
  UserOrganizationModule,
  UserTagModule,
  OrganizationTagModule
]

export default AppImports
