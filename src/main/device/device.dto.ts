import { createZodDto } from '@anatine/zod-nestjs'
import { z } from 'zod'

export const RegisterDeviceDtoBodySchema = z.object({
  fingerprint: z.string(),
  metadata: z.record(z.unknown()).optional()
})

export const CheckDeviceDtoBodySchema = z.object({
  id: z.string().uuid(),
  fingerprint: z.string(),
})

export const RegisterFCMTokenDtoBodySchema = z.object({
  deviceToken: z.string(),
  fcmToken: z.string(),
})

export class RegisterDeviceBodyDto extends createZodDto(RegisterDeviceDtoBodySchema) { }
export class CheckDeviceBodyDto extends createZodDto(CheckDeviceDtoBodySchema) { }
export class RegisterFCMTokenBodyDto extends createZodDto(RegisterFCMTokenDtoBodySchema) { }
