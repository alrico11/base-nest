import { z } from 'zod';
declare const LoginBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    firebaseIdToken: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    password?: string | undefined;
    firebaseIdToken?: string | undefined;
}, {
    email?: string | undefined;
    password?: string | undefined;
    firebaseIdToken?: string | undefined;
}>>;
export declare class LoginBodyDto extends LoginBodyDto_base {
}
declare const LogoutBodyDto_base: import("@anatine/zod-nestjs").ZodDtoStatic<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
export declare class LogoutBodyDto extends LogoutBodyDto_base {
}
export {};
