import { createZodDto } from '@anatine/zod-nestjs'
import { z } from 'zod'

const LoginBodySchema = z.object({
  email: z.string().email().optional(),
  password: z.string().optional(),
  firebaseIdToken: z.string().optional(),
});

const LogoutBodySchema = z.object({})

export class LoginBodyDto extends createZodDto(LoginBodySchema) { }
export class LogoutBodyDto extends createZodDto(LogoutBodySchema) { }