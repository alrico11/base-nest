import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Device } from "@prisma/client";

export const DeviceInstance = createParamDecorator(
  (key: string | undefined, ctx: ExecutionContext): Device => {
    const request = ctx.switchToHttp().getRequest()

    return key !== undefined ? request.device[key] : request.device
  }
)
